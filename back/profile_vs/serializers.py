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
    imagem_base64 = serializers.CharField(write_only=True, required=False, allow_blank=True)
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['user', 'bio', 'cidade', 'imagem', 'imagem_base64', 'seguindo', 'seguidores', 'is_following']
        read_only_fields = ['imagem']

    def get_seguindo(self, obj):
        return obj.seguindo.count()

    def get_seguidores(self, obj):
        return obj.seguidores.count()

    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return request.user.profile.seguindo.filter(pk=obj.pk).exists()
        return False

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        imagem_base64 = validated_data.pop('imagem_base64', None)
        if imagem_base64:
            try:
                instance.imagem = base64.b64decode(imagem_base64)
            except Exception:
                pass
        if user_data:
            user = instance.user
            user.first_name = user_data.get('first_name', user.first_name)
            user.email = user_data.get('email', user.email)
            user.save()
        return super().update(instance, validated_data)
