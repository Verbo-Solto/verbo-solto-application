from rest_framework import serializers
from .models import Obra, Tag, Colecao, Capitulo
from django.contrib.auth.models import User

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'nome']

class ColecaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colecao
        fields = ['id', 'nome', 'descricao', 'criada_em']

class CapituloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capitulo
        fields = ['id', 'colecao', 'titulo', 'conteudo', 'ordem', 'criado_em']

class ObraSerializer(serializers.ModelSerializer):
    autor = serializers.StringRelatedField(read_only=True)
    tags = TagSerializer(many=True, required=False)
    colecao = serializers.PrimaryKeyRelatedField(queryset=Colecao.objects.all(), required=False, allow_null=True)
    paginas = serializers.SerializerMethodField(read_only=True)
    resumo = serializers.CharField(required=False, allow_blank=True, max_length=300)
    cidade = serializers.CharField(required=False, allow_blank=True, max_length=100)
    capa = serializers.ImageField(required=False, allow_null=True)
    capa_base64 = serializers.CharField(write_only=True, required=False, allow_blank=True)
    status = serializers.ChoiceField(choices=[('rascunho', 'Rascunho'), ('publicada', 'Publicada')], default='rascunho')

    class Meta:
        model = Obra
        fields = [
            'id', 'titulo', 'slug', 'conteudo', 'genero', 'status', 'autor', 'tags',
            'publicada_em', 'curtidas', 'visualizacoes', 'comentarios', 'avaliacao_media',
            'criado_em', 'atualizado_em', 'colecao', 'paginas', 'resumo', 'cidade', 'capa', 'capa_base64'
        ]
        read_only_fields = [
            'slug', 'curtidas', 'visualizacoes', 'comentarios', 'avaliacao_media',
            'criado_em', 'atualizado_em'
        ]

    def get_paginas(self, obj):
        palavras = obj.conteudo.split()
        tamanho_pagina = 300
        return [" ".join(palavras[i:i + tamanho_pagina]) for i in range(0, len(palavras), tamanho_pagina)]

    def validate_tags(self, value):
        if len(value) > 5:
            raise serializers.ValidationError("No máximo 5 tags por obra.")
        return value

    def validate(self, data):
        status = data.get('status', getattr(self.instance, 'status', 'rascunho'))
        conteudo = data.get('conteudo') or (getattr(self.instance, 'conteudo', '') if self.instance else '')

        if status == 'publicada':
            # Regras obrigatórias para publicação
            for campo in ['titulo', 'conteudo', 'genero']:
                valor = data.get(campo) or (getattr(self.instance, campo, None) if self.instance else None)
                if not valor or (isinstance(valor, str) and not valor.strip()):
                    raise serializers.ValidationError(f"O campo '{campo}' é obrigatório para publicação.")

            tamanho = len(conteudo)
            if tamanho < 1500 or tamanho > 3000:
                raise serializers.ValidationError("O texto deve ter entre 1.500 e 3.000 caracteres (com espaços).")

        return data

    def create(self, validated_data):
        # Suporte a capa em base64
        capa_base64 = validated_data.pop('capa_base64', None)
        if capa_base64:
            import base64
            from django.core.files.base import ContentFile
            validated_data['capa'] = ContentFile(base64.b64decode(capa_base64), name="capa.png")
        request = self.context.get('request')
        if request and hasattr(request, "user") and request.user.is_authenticated:
            validated_data['autor'] = request.user
        elif not validated_data.get('autor'):
            raise serializers.ValidationError("Usuário não autenticado para criar obra.")

        tags_data = validated_data.pop('tags', [])
        obra = Obra.objects.create(**validated_data)
        for tag in tags_data:
            tag_obj, _ = Tag.objects.get_or_create(nome=tag['nome'] if isinstance(tag, dict) else tag)
            obra.tags.add(tag_obj)
        return obra

    def update(self, instance, validated_data):
        # Suporte a capa em base64 na atualização
        capa_base64 = validated_data.pop('capa_base64', None)
        if capa_base64:
            import base64
            from django.core.files.base import ContentFile
            instance.capa = ContentFile(base64.b64decode(capa_base64), name="capa.png")
            instance.save()
        tags_data = validated_data.pop('tags', None)
        if tags_data is not None:
            instance.tags.clear()
            for tag in tags_data:
                tag_obj, _ = Tag.objects.get_or_create(nome=tag['nome'] if isinstance(tag, dict) else tag)
                instance.tags.add(tag_obj)

        # Validação de tamanho de conteúdo se status for 'publicada'
        status = validated_data.get('status', instance.status)
        conteudo = validated_data.get('conteudo', instance.conteudo)
        if status == 'publicada':
            if len(conteudo) < 1500 or len(conteudo) > 3000:
                raise serializers.ValidationError("O texto deve ter entre 1.500 e 3.000 caracteres (com espaços).")

        return super().update(instance, validated_data)
