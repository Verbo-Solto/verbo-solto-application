from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.utils import timezone

class Tag(models.Model):
    nome = models.CharField(max_length=32, unique=True)

    def __str__(self):
        return self.nome

class Colecao(models.Model):
    nome = models.CharField(max_length=120)
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="colecoes")
    descricao = models.TextField(blank=True)
    criada_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome
class Obra(models.Model):
    STATUS_CHOICES = [
        ('publicada', 'Publicada'),
        ('rascunho', 'Rascunho'),
    ]
    titulo = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    conteudo = models.TextField(blank=True, default='')  # Valor padrão para evitar problemas de migração
    rascunho = models.TextField(blank=True, default='')  # Texto do rascunho editável
    publicado = models.BooleanField(default=False)  # Indica se a obra está publicada
    genero = models.CharField(max_length=40)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='rascunho')
    autor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='obras')
    tags = models.ManyToManyField(Tag, blank=True)
    publicada_em = models.DateTimeField(null=True, blank=True)
    curtidas = models.PositiveIntegerField(default=0)
    visualizacoes = models.PositiveIntegerField(default=0)
    comentarios = models.PositiveIntegerField(default=0)
    avaliacao_media = models.FloatField(default=0)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    colecao = models.ForeignKey(Colecao, on_delete=models.SET_NULL, null=True, blank=True, related_name="obras")
    resumo = models.CharField(max_length=300, blank=True)  # Novo campo
    cidade = models.CharField(max_length=100, blank=True)  # Novo campo
    # capa = models.ImageField(upload_to="capas_obras/", blank=True, null=True)  # Remova ou comente esta linha
    capa = models.BinaryField(blank=True, null=True)  # Salva a imagem da capa no banco de dados

    class Meta:
        ordering = ['-publicada_em', '-criado_em']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.titulo)
            slug = base_slug
            num = 1
            while Obra.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{num}"
                num += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.titulo} ({self.autor.username})"

class Capitulo(models.Model):
    obra = models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="capitulos")
    titulo = models.CharField(max_length=120)
    descricao = models.TextField(blank=True, default="")
    ordem = models.PositiveIntegerField()
    paginas = models.JSONField(default=list)  # Cada página é um HTML/texto
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.titulo} (Obra: {self.obra.titulo})"
