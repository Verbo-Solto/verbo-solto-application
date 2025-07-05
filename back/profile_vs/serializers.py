from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User

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

    class Meta:
        model = UserProfile
        fields = ['user', 'bio', 'cidade', 'imagem', 'seguindo', 'seguidores']

    def get_seguindo(self, obj):
        return obj.seguindo.count()

    def get_seguidores(self, obj):
        return obj.seguidores.count()

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            user.first_name = user_data.get('first_name', user.first_name)
            user.email = user_data.get('email', user.email)
            user.save()
        return super().update(instance, validated_data)
