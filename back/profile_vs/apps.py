from django.apps import AppConfig

class ProfileVsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'profile_vs'

    def ready(self):
        import profile_vs.signals
