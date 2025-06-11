<template>
  <v-container class="fill-height" fluid style="background-color: #f0fdf4;">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" rounded="xl">
          <v-card-text class="pa-10">
            <div class="text-center mb-8">
              <v-img
                :src="logoUrl"
                class="mx-auto"
                max-width="200"  
                contain
              ></v-img>
              </div>

            <v-form @submit.prevent="handleLogin">
              <label class="input-label">Email</label>
              <v-text-field
                v-model="email"
                placeholder="Digite seu email"
                outlined
                dense
                class="mb-4"
                prepend-inner-icon="mdi-email-outline"
                :rules="[rules.required, rules.email]"
                clearable
              ></v-text-field>

              <label class="input-label">Senha</label>
              <v-text-field
                v-model="password"
                placeholder="Digite sua senha"
                outlined
                dense
                prepend-inner-icon="mdi-lock-outline"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :rules="[rules.required]"
                clearable
              ></v-text-field>

              <v-btn
                type="submit"
                color="green-lighten-1"
                class="mt-5"
                block
                size="large"
                rounded
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center pb-5">
            <p class="mb-0">
              Não tem uma conta?
              <router-link
                to="/register"
                class="font-weight-bold text-green-lighten-1"
              >
                Cadastre-se aqui
              </router-link>
            </p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import logoUrl from '../assets/LogoVerboSolto.png'

export default {
  name: "LoginView",
  setup() {
    const email = ref("")
    const password = ref("")
    const showPassword = ref(false)

    const rules = {
      required: value => !!value || "Campo obrigatório.",
      email: value => /.+@.+\..+/.test(value) || "E-mail inválido.",
    }

    const handleLogin = async () => {
      if (email.value && password.value && /.+@.+\..+/.test(email.value)) {
        try {
          console.log("Tentando login com:", email.value)
          alert(`Login bem-sucedido com ${email.value}`)
        } catch (error) {
          console.error("Erro no login:", error)
          alert("Erro ao fazer login. Tente novamente.")
        }
      } else {
        alert("Por favor, preencha todos os campos corretamente.")
      }
    }

    return {
      email,
      password,
      showPassword,
      rules,
      handleLogin,
      logoUrl
    }
  }
}
</script>

<style scoped>
.logo-text {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}
.logo-highlight {
  color: #4caf50;
}
.input-label {
  display: block;
  text-align: left;
  margin-bottom: 4px;
  font-weight: 600;
  color: #555;
  font-size: 0.9rem;
}
a {
  text-decoration: none;
}
a:hover {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}
@media (max-width: 600px) {
  .logo-text {
    font-size: 1.5rem;
  }
}
</style>