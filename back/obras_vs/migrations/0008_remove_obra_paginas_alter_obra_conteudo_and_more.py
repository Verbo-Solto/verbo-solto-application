# Generated by Django 5.2.3 on 2025-07-18 23:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('obras_vs', '0007_auto_20250718_2034'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='obra',
            name='paginas',
        ),
        migrations.AlterField(
            model_name='obra',
            name='conteudo',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='obra',
            name='genero',
            field=models.CharField(max_length=40),
        ),
    ]
