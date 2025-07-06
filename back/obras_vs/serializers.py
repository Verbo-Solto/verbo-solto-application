from rest_framework import serializers
from .models import Obra, Tag, Capitulo, Colecao
from django.contrib.auth.models import User
import base64

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email']
        extra_kwargs = {
            'username': {'read_only': True},
            'email': {'required': False},
            'first_name': {'required': False},
        }

class ObraSerializer(serializers.ModelSerializer):
    autor = UserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    capa = serializers.ImageField(required=False)

    class Meta:
        model = Obra
        fields = '__all__'
        read_only_fields = ('autor', 'visualizacoes', 'curtidas', 'comentarios', 'avaliacao_media', 'publicada_em', 'atualizado_em')

class ObraSimplesSerializer(serializers.ModelSerializer):
    """
    Serializador simplificado para listar obras dentro de uma coleção.
    """
    class Meta:
        model = Obra
        fields = ['id', 'titulo', 'genero', 'capa']

class ColecaoSerializer(serializers.ModelSerializer):
    autor = serializers.ReadOnlyField(source='autor.username')
    obras = ObraSimplesSerializer(many=True, read_only=True)

    class Meta:
        model = Colecao
        fields = ['id', 'nome', 'descricao', 'autor', 'obras']

class CapituloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capitulo
        fields = '__all__'