<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-h5 text-center pa-4">
            Cadastro
          </v-card-title>

          <v-card-text>
            <v-form ref="form" @submit.prevent="handleSubmit">
              <v-text-field
                v-model="formData.name"
                label="Nome"
                :rules="[v => !!v || 'Nome é obrigatório']"
                required
              />

              <v-text-field
                v-model="formData.email"
                label="Email"
                type="email"
                :rules="[
                  v => !!v || 'Email é obrigatório',
                  v => /.+@.+\..+/.test(v) || 'Email deve ser válido'
                ]"
                required
              />

              <v-text-field
                v-model="formData.password"
                label="Senha"
                type="password"
                :rules="[
                  v => !!v || 'Senha é obrigatória',
                  v => v?.length >= 6 || 'Senha deve ter no mínimo 6 caracteres'
                ]"
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
                  Cadastrar
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>

          <v-divider class="mt-2"></v-divider>

          <v-card-text class="text-center pt-2">
            <span class="text-body-2">Já tem uma conta?</span>
            <v-btn
              variant="text"
              color="primary"
              class="ml-2"
              :to="{ name: 'login' }"
              :disabled="auth.loading"
            >
              Faça login
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
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import type { RegisterData } from '@/types/auth'

const router = useRouter()
const auth = useAuthStore()
const form = ref<any>(null)
const showError = ref(false)

const formData = ref<RegisterData>({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = async () => {
  if (!form.value?.validate()) return

  try {
    await auth.register(formData.value)
    router.push('/dashboard')
  } catch (error) {
    showError.value = true
  }
}
</script>