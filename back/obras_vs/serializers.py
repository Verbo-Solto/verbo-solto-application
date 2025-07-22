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
        fields = ['id', 'obra', 'titulo', 'descricao', 'ordem', 'paginas', 'criado_em']

    def validate_paginas(self, value):
        for idx, pagina in enumerate(value):
            if len(pagina) > 3000:
                raise serializers.ValidationError(f"Página {idx+1} excede o limite de 3000 caracteres.")
        return value

class ObraSerializer(serializers.ModelSerializer):
    """Serializer para obras, compatível com o front-end Next.js."""
    
    autor = serializers.SerializerMethodField(read_only=True)
    tags = TagSerializer(many=True, required=False)
    colecao = serializers.PrimaryKeyRelatedField(queryset=Colecao.objects.all(), required=False, allow_null=True)
    paginas = serializers.SerializerMethodField(read_only=True)
    resumo = serializers.CharField(required=False, allow_blank=True, max_length=300)
    cidade = serializers.CharField(required=False, allow_blank=True, max_length=100)
    capa = serializers.SerializerMethodField(read_only=True)
    capa_base64 = serializers.CharField(write_only=True, required=False, allow_blank=True)
    status = serializers.ChoiceField(choices=[('rascunho', 'Rascunho'), ('publicada', 'Publicada')], default='rascunho')
    capitulos = CapituloSerializer(many=True, required=False)
    rascunho = serializers.CharField(required=False, allow_blank=True)
    publicado = serializers.BooleanField(required=False)

    class Meta:
        model = Obra
        fields = [
            'id', 'titulo', 'slug', 'conteudo', 'rascunho', 'publicado', 'genero', 'status', 'autor', 'tags',
            'publicada_em', 'curtidas', 'visualizacoes', 'comentarios', 'avaliacao_media',
            'criado_em', 'atualizado_em', 'colecao', 'paginas', 'resumo', 'cidade', 'capa', 'capa_base64',
            'capitulos'
        ]
        read_only_fields = [
            'slug', 'curtidas', 'visualizacoes', 'comentarios', 'avaliacao_media',
            'criado_em', 'atualizado_em'
        ]

    def to_internal_value(self, data):
        # Permite que tags seja lista de strings ou objetos
        tags = data.get('tags')
        if tags and isinstance(tags, list) and tags and isinstance(tags[0], str):
            data = data.copy()
            data['tags'] = [{'nome': t} for t in tags]
        return super().to_internal_value(data)

    def get_paginas(self, obj):
        """Divide o conteúdo em páginas de no máximo 3000 caracteres cada. Sempre retorna lista (pode ser vazia)."""
        if not obj.conteudo:
            return []
        
        conteudo = obj.conteudo
        tamanho_pagina = 3000  # Máximo 3000 caracteres por página
        paginas = []
        
        # Divide o conteúdo em páginas de 3000 caracteres
        for i in range(0, len(conteudo), tamanho_pagina):
            pagina = conteudo[i:i + tamanho_pagina]
            paginas.append(pagina)
        
        return paginas

    def validate_tags(self, value):
        if len(value) > 5:
            raise serializers.ValidationError("No máximo 5 tags por obra.")
        return value

    def validate_conteudo(self, value):
        """
        Não limita o conteúdo total da obra.
        A divisão em páginas será feita automaticamente pelo get_paginas().
        """
        return value

    def validate(self, data):
        status = data.get('status', getattr(self.instance, 'status', 'rascunho'))
        publicado = data.get('publicado', False)
        conteudo = data.get('conteudo') or (getattr(self.instance, 'conteudo', '') if self.instance else '')
        rascunho = data.get('rascunho') or (getattr(self.instance, 'rascunho', '') if self.instance else '')

        if publicado or status == 'publicada':
            # Regras obrigatórias para publicação
            for campo in ['titulo', 'conteudo', 'genero', 'resumo']:
                valor = data.get(campo) or (getattr(self.instance, campo, None) if self.instance else None)
                if not valor or (isinstance(valor, str) and not valor.strip()):
                    raise serializers.ValidationError({campo: f"O campo '{campo}' é obrigatório para publicação."})
            if len(conteudo) < 1500:
                raise serializers.ValidationError({"conteudo": "O texto deve ter pelo menos 1.500 caracteres para publicação."})
        # Para rascunho, não exige nada obrigatório
        return data

    def get_capa(self, obj):
        if obj.capa:
            import base64
            # Sempre retorna base64 se for bytes ou memoryview
            if isinstance(obj.capa, bytes):
                return base64.b64encode(obj.capa).decode("utf-8")
            elif isinstance(obj.capa, memoryview):
                return base64.b64encode(obj.capa.tobytes()).decode("utf-8")
            elif isinstance(obj.capa, str):
                # Caso legado: converte string para bytes antes de base64
                return base64.b64encode(obj.capa.encode("latin1")).decode("utf-8")
        return None

    def get_autor(self, obj):
        if obj.autor:
            return {
                'username': obj.autor.username,
                'id': obj.autor.id,
                'first_name': obj.autor.first_name,
                'email': obj.autor.email,
            }
        return None

    def create(self, validated_data):
        capa_base64 = validated_data.pop('capa_base64', None)
        if capa_base64:
            import base64
            validated_data['capa'] = base64.b64decode(capa_base64)
        request = self.context.get('request')
        if request and hasattr(request, "user") and request.user.is_authenticated:
            validated_data['autor'] = request.user
        elif not validated_data.get('autor'):
            raise serializers.ValidationError("Usuário não autenticado para criar obra.")

        tags_data = validated_data.pop('tags', [])
        capitulos_data = validated_data.pop('capitulos', [])
        obra = Obra.objects.create(**validated_data)
        for tag in tags_data:
            tag_obj, _ = Tag.objects.get_or_create(nome=tag['nome'] if isinstance(tag, dict) else tag)
            obra.tags.add(tag_obj)
        # Cria capítulos aninhados
        for idx, cap_data in enumerate(capitulos_data):
            Capitulo.objects.create(
                obra=obra,
                titulo=cap_data.get('titulo', f'Capítulo {idx+1}'),
                descricao=cap_data.get('descricao', ''),
                ordem=cap_data.get('ordem', idx+1),
                paginas=cap_data.get('paginas', []),
            )
        return obra

    def update(self, instance, validated_data):
        capa_base64 = validated_data.pop('capa_base64', None)
        # Desabilita atualização de capa via update
        if 'capa' in validated_data:
            validated_data.pop('capa')
        # Proteção extra: garante que capa nunca será string (mesmo se vier por erro do frontend)
        if hasattr(instance, 'capa') and isinstance(instance.capa, str):
            try:
                instance.capa = instance.capa.encode('latin1')
            except Exception:
                instance.capa = None
        # tags, status, conteudo...
        tags_data = validated_data.pop('tags', None)
        if tags_data is not None:
            instance.tags.clear()
            for tag in tags_data:
                tag_obj, _ = Tag.objects.get_or_create(nome=tag['nome'] if isinstance(tag, dict) else tag)
                instance.tags.add(tag_obj)

        status = validated_data.get('status', instance.status)
        conteudo = validated_data.get('conteudo', instance.conteudo)
        if status == 'publicada':
            if len(conteudo) < 1500:
                raise serializers.ValidationError("O texto deve ter pelo menos 1.500 caracteres para publicação.")
        # Atualiza capítulos aninhados
        capitulos_data = validated_data.pop('capitulos', None)
        if capitulos_data is not None:
            instance.capitulos.all().delete()
            for idx, cap_data in enumerate(capitulos_data):
                Capitulo.objects.create(
                    obra=instance,
                    titulo=cap_data.get('titulo', f'Capítulo {idx+1}'),
                    descricao=cap_data.get('descricao', ''),
                    ordem=cap_data.get('ordem', idx+1),
                    paginas=cap_data.get('paginas', []),
                )
        return super().update(instance, validated_data)