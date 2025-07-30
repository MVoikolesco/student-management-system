<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-card-title class="text-center pt-4">
            <h2>Cadastro</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleRegister" ref="form">
              <v-text-field
                v-model="name"
                label="Nome"
                required
                :rules="[rules.required]"
              />
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                :rules="[rules.required, rules.email]"
              />
              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                required
                :rules="[rules.required, rules.password]"
              />
              <v-text-field
                v-model="confirmPassword"
                label="Confirmar Senha"
                type="password"
                required
                :rules="[rules.required, rules.confirmPassword]"
              />
              <v-btn
                type="submit"
                color="primary"
                block
                class="mt-4"
                :loading="loading"
              >
                Cadastrar e Entrar
              </v-btn>
              <v-btn
                variant="text"
                block
                class="mt-2"
                @click="$router.push('/login')"
              >
                Já tem uma conta? Faça login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar para mensagens -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const form = ref<any>(null)
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

const rules = {
  required: (v: any) => !!v || 'Campo obrigatório',
  email: (v: any) => /.+@.+\..+/.test(v) || 'E-mail inválido',
  password: (v: any) => v.length >= 6 || 'A senha deve ter no mínimo 6 caracteres',
  confirmPassword: (v: any) => v === password.value || 'As senhas não coincidem'
}

const showMessage = (text: string, color: 'success' | 'error' = 'success') => {
  snackbar.value = {
    show: true,
    text,
    color
  }
}

const handleRegister = async () => {
  const { valid } = await form.value.validate()
  
  if (!valid) return

  loading.value = true
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value
    })
  } catch (error: any) {
    showMessage(error.message, 'error')
  } finally {
    loading.value = false
  }
}
</script> 