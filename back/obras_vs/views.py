from rest_framework import viewsets, permissions, status, generics, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from .models import Obra, Tag
from .serializers import ObraSerializer, TagSerializer
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

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]
