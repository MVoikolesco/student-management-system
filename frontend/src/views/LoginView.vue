<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-h5 text-center pa-4">
            Login
          </v-card-title>

          <v-card-text>
            <v-form ref="form" @submit.prevent="handleSubmit">
              <v-text-field
                v-model="formData.email"
                label="Email"
                type="email"
                :rules="[
                  (v: string) => !!v || 'Email é obrigatório',
                  (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido'
                ]"
                required
              />

              <v-text-field
                v-model="formData.password"
                label="Senha"
                type="password"
                :rules="[(v: string) => !!v || 'Senha é obrigatória']"
                required
              />

              <v-card-actions class="pa-0">
                <v-spacer />
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="auth.loading"
                  block
                >
                  Entrar
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>

          <v-divider class="mt-2"></v-divider>

          <v-card-text class="text-center pt-2">
            <span class="text-body-2">Não tem uma conta?</span>
            <v-btn
              variant="text"
              color="primary"
              class="ml-2"
              :to="{ name: 'register' }"
              :disabled="auth.loading"
            >
              Cadastre-se
            </v-btn>
          </v-card-text>
        </v-card>

        <v-snackbar
          v-model="showError"
          color="error"
          timeout="3000"
        >
          {{ auth.error }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import type { LoginCredentials } from '@/types/auth'

const route = useRoute()
const router = useRouter()

const auth = useAuthStore()
const form = ref<any>(null)
const showError = ref(false)

const formData = ref<LoginCredentials>({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  if (!form.value?.validate()) {
    return
  }

  try {
    await auth.login(formData.value)
    
    const redirect = route.query.redirect?.toString() || '/dashboard'
    await router.push(redirect)
  } catch (error) {
    console.error('Erro no login:', error)
    showError.value = true
  }
}

onMounted(() => {
  if (auth.isAuthenticated && auth.user) {
    const redirect = route.query.redirect?.toString() || '/dashboard'
    router.push(redirect)
  }
})
</script>