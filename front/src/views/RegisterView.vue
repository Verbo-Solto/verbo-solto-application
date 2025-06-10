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

            <v-form @submit.prevent="handleRegister" ref="form">
              <label class="input-label">Nome completo</label>
              <v-text-field
                v-model="fullName"
                placeholder="Digite seu nome completo"
                outlined
                dense
                class="mb-4"
                :rules="[rules.required]"
                clearable
              ></v-text-field>

              <label class="input-label">Nome de usuário</label>
              <v-text-field
                v-model="username"
                placeholder="Digite seu nome de usuário"
                outlined
                dense
                class="mb-4"
                prepend-inner-icon="mdi-account-outline"
                :rules="[rules.required]"
                clearable
              ></v-text-field>

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
                Cadastrar-se
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center pb-5">
            <p class="mb-0">
              Já tem uma conta?
              <router-link
                to="/"
                class="font-weight-bold text-green-lighten-1"
              >
                Faça login na sua conta
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
import { useRouter } from 'vue-router'
import logoUrl from '../assets/LogoVerboSolto.png'

export default {
  name: "RegisterView",
  setup() {
    const form = ref(null) 
    const fullName = ref("")
    const username = ref("")
    const email = ref("")
    const password = ref("")
    const showPassword = ref(false)
    const router = useRouter()

    const rules = {
      required: value => !!value || "Campo obrigatório.",
      email: value => /.+@.+\..+/.test(value) || "E-mail inválido.",
    }

    const handleRegister = async () => {
      const { valid } = await form.value.validate()

      if (valid) {
        try {
          console.log("Tentando cadastrar com:", { 
            fullName: fullName.value,
            username: username.value,
            email: email.value 
          })
          alert(`Cadastro bem-sucedido para ${email.value}!`)
          router.push('/') 
        } catch (error) {
          console.error("Erro no cadastro:", error)
          alert("Erro ao cadastrar. Tente novamente.")
        }
      } else {
        alert("Por favor, preencha todos os campos corretamente.")
      }
    }

    return {
      form,
      fullName,
      username,
      email,
      password,
      showPassword,
      rules,
      handleRegister,
      logoUrl
    }
  }
}
</script>

<style scoped>
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
</style>