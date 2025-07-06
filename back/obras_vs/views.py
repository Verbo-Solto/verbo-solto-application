from rest_framework import viewsets, permissions, status, generics, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from .models import Obra, Tag, Colecao, Capitulo
from .serializers import ObraSerializer, TagSerializer, CapituloSerializer, ColecaoSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, BasePermission

class IsAuthorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.autor == request.user

class ObraViewSet(viewsets.ModelViewSet):
    queryset = Obra.objects.all().select_related('autor').prefetch_related('tags')
    serializer_class = ObraSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
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
        publicadas = Obra.objects.filter(autor=request.user, status='publicada')
        rascunhos = Obra.objects.filter(autor=request.user, status='rascunho')
        return Response({
            "publicadas": ObraSerializer(publicadas, many=True).data,
            "rascunhos": ObraSerializer(rascunhos, many=True).data,
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

    @action(detail=False, methods=['get'], url_path='minhas-obras', permission_classes=[IsAuthenticated])
    def minhas_obras(self, request):
        obras = Obra.objects.filter(autor=request.user)
        serializer = self.get_serializer(obras, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        # Log para depuração
        print("Dados recebidos no POST /api/obras/:", request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Log de erros de validação
            print("Erros de validação:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]

from rest_framework import mixins

class ColecaoViewSet(viewsets.ModelViewSet):
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
        # Só retorna capítulos das coleções do usuário autenticado
        return Capitulo.objects.filter(colecao__autor=self.request.user)
