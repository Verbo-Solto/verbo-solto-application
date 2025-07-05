# allauth_vs/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from profile_vs.models import UserProfile

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        full_name = request.data.get('full_name', '')
        bio = request.data.get('bio', '')
        cidade = request.data.get('cidade', '')

        if not username or not email or not password:
            return Response({'error': 'Todos os campos são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Nome de usuário já existe.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'E-mail já cadastrado.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        if full_name:
            user.first_name = full_name
            user.save()

        profile, _ = UserProfile.objects.get_or_create(user=user)
        profile.bio = bio
        profile.cidade = cidade
        profile.save()

        return Response({'message': 'Usuário registrado com sucesso.'}, status=status.HTTP_201_CREATED)
