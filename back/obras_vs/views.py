from rest_framework import viewsets, permissions, status, generics, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from .models import Obra, Tag, Colecao, Capitulo
from .serializers import ObraSerializer, TagSerializer, CapituloSerializer, ColecaoSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, BasePermission
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from django_filters import rest_framework as filters

class IsAuthorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.autor == request.user

class ObraViewSet(viewsets.ModelViewSet):
    queryset = Obra.objects.all().select_related('autor').prefetch_related('tags')
    serializer_class = ObraSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['genero', 'status', 'tags__nome', 'autor__username']
    search_fields = ['titulo', 'conteudo', 'tags__nome', 'autor__username']
    ordering_fields = ['publicada_em', 'curtidas', 'visualizacoes', 'comentarios', 'avaliacao_media', 'titulo']
    ordering = ['-publicada_em', '-criado_em']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy', 'minhas']:
            return [IsAuthenticated(), IsAuthorOrReadOnly()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)

    def perform_update(self, serializer):
        serializer.save(autor=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def minhas(self, request):
        """Retorna as obras do usuário autenticado separadas em publicadas e rascunhos."""
        publicadas = Obra.objects.filter(autor=request.user, status='publicada')
        rascunhos = Obra.objects.filter(autor=request.user, status='rascunho')
        return Response({
            "publicadas": ObraSerializer(publicadas, many=True, context={'request': request}).data,
            "rascunhos": ObraSerializer(rascunhos, many=True, context={'request': request}).data,
        })

    @action(detail=True, methods=['get'])
    def estatisticas(self, request, pk=None):
        obra = self.get_object()
        return Response({
            "curtidas": obra.curtidas,
            "visualizacoes": obra.visualizacoes,
            "comentarios": obra.comentarios,
            "avaliacao_media": obra.avaliacao_media,
        })

    def create(self, request, *args, **kwargs):
        print("Dados recebidos no POST /api/obras/:", request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Erros de validação:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]

class ColecaoViewSet(viewsets.ModelViewSet):
    """ViewSet para coleções do usuário autenticado."""
    queryset = Colecao.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ColecaoSerializer

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            self.permission_denied(self.request, message="Autenticação obrigatória para acessar coleções.")
        return Colecao.objects.filter(autor=user)

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)

class CapituloViewSet(viewsets.ModelViewSet):
    queryset = Capitulo.objects.all()
    serializer_class = CapituloSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna apenas capítulos de obras do usuário autenticado
        return Capitulo.objects.filter(obra__autor=self.request.user)

class ObraCidadeFilter(filters.FilterSet):
    autor_cidade = filters.CharFilter(method='filter_autor_cidade')

    class Meta:
        model = Obra
        fields = ['genero', 'status', 'tags__nome', 'autor__username']

    def filter_autor_cidade(self, queryset, name, value):
        return queryset.filter(autor__profile__cidade__icontains=value)

class ExploreObrasAPIView(ListAPIView):
    """Endpoint de exploração de obras públicas com filtros, busca e ordenação."""
    serializer_class = ObraSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ObraCidadeFilter
    search_fields = ['titulo', 'conteudo', 'tags__nome', 'autor__username']
    ordering_fields = ['publicada_em', 'curtidas', 'visualizacoes', 'comentarios', 'avaliacao_media', 'titulo']
    ordering = ['-publicada_em', '-criado_em']

    def get_queryset(self):
        return Obra.objects.filter(status='publicada').select_related('autor', 'autor__profile').prefetch_related('tags')

class EstatisticasGeraisObrasAPIView(APIView):
    def get(self, request):
        from django.db.models import Sum, Avg, Count
        qs = Obra.objects.filter(status='publicada')
        total_obras = qs.count()
        total_curtidas = qs.aggregate(s=Sum('curtidas'))['s'] or 0
        total_visualizacoes = qs.aggregate(s=Sum('visualizacoes'))['s'] or 0
        total_comentarios = qs.aggregate(s=Sum('comentarios'))['s'] or 0
        avaliacao_media = qs.aggregate(a=Avg('avaliacao_media'))['a'] or 0
        escritores_ativos = qs.values('autor').distinct().count()
        return Response({
            'total_obras': total_obras,
            'total_curtidas': total_curtidas,
            'total_visualizacoes': total_visualizacoes,
            'total_comentarios': total_comentarios,
            'avaliacao_media': round(avaliacao_media, 2),
            'escritores_ativos': escritores_ativos,
        })

class BibliotecaAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # Mock: todas as obras publicadas do usuário em 'lendo', listas vazias para finalizados/favoritos
        obras_lendo = Obra.objects.filter(autor=request.user, status='publicada')
        return Response({
            'lendo': ObraSerializer(obras_lendo, many=True, context={'request': request}).data,
            'finalizados': [],
            'favoritos': [],
        })
