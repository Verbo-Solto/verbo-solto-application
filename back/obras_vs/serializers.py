from rest_framework import serializers
from .models import Obra, Tag, Colecao
from django.contrib.auth.models import User

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'nome']

class ObraSerializer(serializers.ModelSerializer):
    autor = serializers.StringRelatedField(read_only=True)
    tags = TagSerializer(many=True, required=False)
    colecao = serializers.PrimaryKeyRelatedField(queryset=Colecao.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Obra
        fields = [
            'id', 'titulo', 'slug', 'conteudo', 'genero', 'status', 'autor', 'tags',
            'publicada_em', 'curtidas', 'visualizacoes', 'comentarios', 'avaliacao_media',
            'criado_em', 'atualizado_em', 'colecao'
        ]
        read_only_fields = ['slug', 'curtidas', 'visualizacoes', 'comentarios', 'avaliacao_media', 'criado_em', 'atualizado_em']

    def validate_tags(self, value):
        if len(value) > 5:
            raise serializers.ValidationError("No máximo 5 tags por obra.")
        return value

    def validate_status(self, value):
        if value not in ['publicada', 'rascunho']:
            raise serializers.ValidationError("Status inválido.")
        return value

    def validate_conteudo(self, value):
        if len(value.split()) > 2000:
            raise serializers.ValidationError("O texto excede o limite de 2000 palavras.")
        return value

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        obra = Obra.objects.create(**validated_data)
        for tag in tags_data:
            tag_obj, _ = Tag.objects.get_or_create(nome=tag['nome'])
            obra.tags.add(tag_obj)
        return obra

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', None)
        if tags_data is not None:
            instance.tags.clear()
            for tag in tags_data:
                tag_obj, _ = Tag.objects.get_or_create(nome=tag['nome'])
                instance.tags.add(tag_obj)
        return super().update(instance, validated_data)
