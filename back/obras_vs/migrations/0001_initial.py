# Generated by Django 5.2.3 on 2025-07-21 23:19

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=32, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Colecao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=120)),
                ('descricao', models.TextField(blank=True)),
                ('criada_em', models.DateTimeField(auto_now_add=True)),
                ('autor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='colecoes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Obra',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=120)),
                ('slug', models.SlugField(blank=True, max_length=140, unique=True)),
                ('conteudo', models.TextField(blank=True, default='')),
                ('genero', models.CharField(max_length=40)),
                ('status', models.CharField(choices=[('publicada', 'Publicada'), ('rascunho', 'Rascunho')], default='rascunho', max_length=10)),
                ('publicada_em', models.DateTimeField(blank=True, null=True)),
                ('curtidas', models.PositiveIntegerField(default=0)),
                ('visualizacoes', models.PositiveIntegerField(default=0)),
                ('comentarios', models.PositiveIntegerField(default=0)),
                ('avaliacao_media', models.FloatField(default=0)),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
                ('atualizado_em', models.DateTimeField(auto_now=True)),
                ('resumo', models.CharField(blank=True, max_length=300)),
                ('cidade', models.CharField(blank=True, max_length=100)),
                ('capa', models.BinaryField(blank=True, null=True)),
                ('autor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='obras', to=settings.AUTH_USER_MODEL)),
                ('colecao', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='obras', to='obras_vs.colecao')),
                ('tags', models.ManyToManyField(blank=True, to='obras_vs.tag')),
            ],
            options={
                'ordering': ['-publicada_em', '-criado_em'],
            },
        ),
        migrations.CreateModel(
            name='Capitulo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=120)),
                ('descricao', models.TextField(blank=True, default='')),
                ('ordem', models.PositiveIntegerField()),
                ('paginas', models.JSONField(default=list)),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
                ('obra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='capitulos', to='obras_vs.obra')),
            ],
        ),
    ]
