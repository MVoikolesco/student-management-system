import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterData } from '@/types/auth'
import { authService } from '@/services/auth.service'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  const initialize = () => {
    if (authService.isAuthenticated()) {
      const savedUser = authService.getUser()
      if (savedUser) {
        user.value = savedUser
      }
      authService.initialize()
    } else {
      user.value = null
      authService.logout()
    }
  }

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null
    try {
      const response = await authService.login(credentials)
      authService.setAuth(response)
      user.value = response.user
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Erro ao fazer login'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const register = async (data: RegisterData) => {
    loading.value = true
    error.value = null
    try {
      const response = await authService.register(data)
      authService.setAuth(response)
      user.value = response.user
      router.push('/dashboard')
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Erro ao registrar'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await authService.logout()
    user.value = null
    router.push('/login')
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    initialize,
    login,
    register,
    logout
  }
})