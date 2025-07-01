from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from django.contrib.auth.models import User

class AuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('api_register')
        self.token_url = reverse('token_obtain_pair')
        self.user_data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpass123',
            'full_name': 'Test User'
        }
        User.objects.create_user(username='existing', email='existing@example.com', password='testpass123')

    def test_register_success(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('Usuário registrado com sucesso.', response.data.get('message', ''))

    def test_register_duplicate_username(self):
        data = self.user_data.copy()
        data['username'] = 'existing'
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('Nome de usuário já existe.', response.data.get('error', ''))

    def test_register_duplicate_email(self):
        data = self.user_data.copy()
        data['email'] = 'existing@example.com'
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('E-mail já cadastrado.', response.data.get('error', ''))

    def test_login_success(self):
        User.objects.create_user(username='loginuser', email='login@example.com', password='testpass123')
        response = self.client.post(self.token_url, {'username': 'loginuser', 'password': 'testpass123'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_invalid(self):
        response = self.client.post(self.token_url, {'username': 'wrong', 'password': 'wrongpass'}, format='json')
        self.assertEqual(response.status_code, 401)
        self.assertIn('Nenhuma conta ativa encontrada', str(response.data))
