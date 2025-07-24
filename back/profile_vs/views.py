from rest_framework import generics, permissions
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

class UserProfileMeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

class PublicProfileView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'user__username'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

class SeguidoresListView(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs['username']
        try:
            user = User.objects.get(username=username)
            return user.profile.seguidores.all()
        except User.DoesNotExist:
            return UserProfile.objects.none()

class SeguindoListView(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        username = self.kwargs['username']
        try:
            user = User.objects.get(username=username)
            return user.profile.seguindo.all()
        except User.DoesNotExist:
            return UserProfile.objects.none()

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def seguir_usuario(request, username):
    try:
        alvo = User.objects.get(username=username).profile
        if alvo != request.user.profile:
            request.user.profile.seguindo.add(alvo)
            return Response({'status': 'seguindo'}, status=200)
        return Response({'erro': 'Não pode seguir a si mesmo'}, status=400)
    except User.DoesNotExist:
        return Response({'erro': 'Usuário não encontrado'}, status=404)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def deixar_de_seguir(request, username):
    try:
        alvo = User.objects.get(username=username).profile
        request.user.profile.seguindo.remove(alvo)
        return Response({'status': 'seguimento removido'}, status=200)
    except User.DoesNotExist:
        return Response({'erro': 'Usuário não encontrado'}, status=404)
