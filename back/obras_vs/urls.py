from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ObraViewSet, TagViewSet

router = DefaultRouter()
router.register(r'obras', ObraViewSet, basename='obra')
router.register(r'tags', TagViewSet, basename='tag')

urlpatterns = [
    path('', include(router.urls)),
]
