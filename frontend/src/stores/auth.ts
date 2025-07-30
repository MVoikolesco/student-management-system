import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'
import api from '@/services/api'

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
}

interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

interface AuthResponse {
  user: User
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!token.value)

  const setAuthData = ({ user: userData, token: newToken }: AuthResponse) => {
    token.value = newToken
    user.value = userData
    localStorage.setItem('token', newToken)
  }

  const register = async (data: RegisterData) => {
    try {
      const { data: response } = await api.post<AuthResponse>('/api/auth/register', data)
      setAuthData(response)
      router.push('/students')
      return response
    } catch (error: any) {
      console.error('Erro no registro:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Erro ao realizar cadastro')
    }
  }

  const login = async (data: LoginData) => {
    try {
      const { data: response } = await api.post<AuthResponse>('/api/auth/login', data)
      setAuthData(response)
      router.push('/students')
      return response
    } catch (error: any) {
      console.error('Erro no login:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Erro ao fazer login')
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  const initialize = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    register,
    login,
    logout,
    initialize
  }
}) 