from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ObraViewSet, TagViewSet, ColecaoViewSet, CapituloViewSet, ExploreObrasAPIView, EstatisticasGeraisObrasAPIView, BibliotecaAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, BasePermission
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter, OrderingFilter

router = DefaultRouter()
router.register(r'obras', ObraViewSet, basename='obra')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'colecoes', ColecaoViewSet, basename='colecao')
router.register(r'capitulos', CapituloViewSet, basename='capitulo')

urlpatterns = [
    path('obras/minhas/', ObraViewSet.as_view({'get': 'minhas'}), name='obras-minhas'),
    path('explorar/', ExploreObrasAPIView.as_view(), name='explorar-obras'),
    path('obras/estatisticas-gerais/', EstatisticasGeraisObrasAPIView.as_view(), name='estatisticas-gerais-obras'),
    path('biblioteca/', BibliotecaAPIView.as_view(), name='biblioteca'),
    path('', include(router.urls)),
]