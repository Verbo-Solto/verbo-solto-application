from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    cidade = models.CharField(max_length=100, blank=True)
    imagem = models.ImageField(upload_to='profiles/', blank=True, null=True)
    seguidores = models.ManyToManyField('self', symmetrical=False, related_name='seguindo', blank=True)

    def __str__(self):
        return self.user.username
