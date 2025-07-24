from django.urls import path
from .views import UserProfileMeView, PublicProfileView, seguir_usuario, deixar_de_seguir, SeguidoresListView, SeguindoListView

urlpatterns = [
    path('profile/me/', UserProfileMeView.as_view(), name='profile-me'),
    path('profile/<str:user__username>/', PublicProfileView.as_view(), name='public-profile'),
    path('profile/<str:username>/seguir/', seguir_usuario, name='seguir-usuario'),
    path('profile/<str:username>/deixar-de-seguir/', deixar_de_seguir, name='deixar-de-seguir'),
    path('profile/<str:username>/seguidores/', SeguidoresListView.as_view(), name='listar-seguidores'),
    path('profile/<str:username>/seguindo/', SeguindoListView.as_view(), name='listar-seguindo'),
]
