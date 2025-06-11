# verbo-solto-front
Repositório destinado ao front-end

# Verbo Solto Application

Este projeto é composto por um backend em Django + Django REST Framework e um frontend em Vue.js + Vuetify.

## Pré-requisitos
- Python 3.10+
- Node.js 18+
- npm

---

## 1. Configuração do Backend (Django)

1. Acesse a pasta do backend:
   ```sh
   cd back
   ```
2. Crie e ative um ambiente virtual (opcional, mas recomendado):
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Instale as dependências:
   ```sh
   pip install django djangorestframework djangorestframework-simplejwt django-allauth django-cors-headers
   ```
4. Execute as migrações:
   ```sh
   python manage.py migrate
   ```
5. (Opcional) Crie um superusuário para acessar o admin:
   ```sh
   python manage.py createsuperuser
   ```
6. Inicie o servidor backend:
   ```sh
   python manage.py runserver
   ```
   O backend estará disponível em http://localhost:8000

---

## 2. Configuração do Frontend (Vue.js)

1. Acesse a pasta do frontend:
   ```sh
   cd front
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor frontend:
   ```sh
   npm run dev
   ```
   O frontend estará disponível em http://localhost:5173

---

## 3. Fluxo de autenticação
- O registro de usuário é feito via endpoint REST: `POST /api/register/` (backend)
- O login é feito via endpoint JWT: `POST /api/token/` (backend)
- O frontend salva o token JWT no navegador e utiliza para autenticação.

---

## 4. Observações
- Certifique-se de que o backend está rodando em http://localhost:8000 antes de iniciar o frontend.
- O frontend espera que o backend esteja acessível em http://localhost:8000. Se mudar a porta, ajuste em `src/services/authService.js`.
- Para acessar o admin Django: http://localhost:8000/admin/

---

## 5. Estrutura do Projeto
```
verbo-solto-application/
├── back/        # Backend Django
│   ├── allauth_vs/
│   ├── db.sqlite3
│   └── manage.py
├── front/       # Frontend Vue.js
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

