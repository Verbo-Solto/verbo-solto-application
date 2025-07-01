from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterAPIView
from profile_vs.views import (
    UserProfileMeView,
    PublicProfileView,
    seguir_usuario,
    deixar_de_seguir
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # auth
    path('accounts/', include('allauth.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterAPIView.as_view(), name='api_register'),

    # perfis
    path('api/profiles/me/', UserProfileMeView.as_view(), name='meu-perfil'),
    path('api/profiles/public/<str:user__username>/', PublicProfileView.as_view(), name='perfil-publico'),
    path('api/profiles/follow/<str:username>/', seguir_usuario, name='seguir-usuario'),
    path('api/profiles/unfollow/<str:username>/', deixar_de_seguir, name='deixar-de-seguir'),

    # obras
    path('api/', include('obras_vs.urls')),
]
