from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User
import base64

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email']
        extra_kwargs = {
            'username': {'read_only': True},
            'email': {'required': False},
            'first_name': {'required': False},
        }

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False)
    seguindo = serializers.SerializerMethodField()
    seguidores = serializers.SerializerMethodField()
    imagem = serializers.SerializerMethodField()
    imagem_base64 = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'bio', 'cidade', 'imagem', 'imagem_base64', 'seguindo', 'seguidores']

    def get_seguindo(self, obj):
        return obj.seguindo.count()

    def get_seguidores(self, obj):
        return obj.seguidores.count()

    def get_imagem(self, obj):
        if obj.imagem:
            # Garante que só tenta converter se for bytes
            if isinstance(obj.imagem, bytes):
                return base64.b64encode(obj.imagem).decode('utf-8')
            # Se for string (por erro legado), converte para bytes antes
            elif isinstance(obj.imagem, str):
                return base64.b64encode(obj.imagem.encode('latin1')).decode('utf-8')
        return None

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        imagem_base64 = validated_data.pop('imagem_base64', None)
        if user_data:
            user = instance.user
            user.first_name = user_data.get('first_name', user.first_name)
            user.email = user_data.get('email', user.email)
            user.save()
        if imagem_base64:
            instance.imagem = base64.b64decode(imagem_base64)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        imagem_base64 = validated_data.pop('imagem_base64', None)
        instance = super().create(validated_data)
        if imagem_base64:
            instance.imagem = base64.b64decode(imagem_base64)
            instance.save()
        return instance
