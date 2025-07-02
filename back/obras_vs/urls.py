from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ObraViewSet, TagViewSet, ColecaoViewSet, CapituloViewSet

router = DefaultRouter()
router.register(r'obras', ObraViewSet, basename='obra')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'colecoes', ColecaoViewSet, basename='colecao')
router.register(r'capitulos', CapituloViewSet, basename='capitulo')

urlpatterns = [
    path('', include(router.urls)),
]
