import api from './api'
import type { LoginCredentials, RegisterData, AuthResponse } from '@/types/auth'

export class AuthService {
  private baseUrl = '/api/auth'
  private tokenKey = 'auth_token'
  private userKey = 'auth_user'

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post(`${this.baseUrl}/login`, credentials)
    const data = response.data
    this.setAuth(data)
    return data
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post(`${this.baseUrl}/register`, data)
    const responseData = response.data
    this.setAuth(responseData)
    return responseData
  }

  async logout(): Promise<void> {
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.userKey)
    delete api.defaults.headers.common['Authorization']
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  getUser(): any | null {
    const user = localStorage.getItem(this.userKey)
    return user ? JSON.parse(user) : null
  }

  setAuth(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token)
    localStorage.setItem(this.userKey, JSON.stringify(response.user))
    api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) return false
    
    // Verifica se o token está no formato JWT
    const parts = token.split('.')
    if (parts.length !== 3) return false

    try {
      // Decodifica o payload do token
      const payload = JSON.parse(atob(parts[1]))
      // Verifica se o token expirou
      const exp = payload.exp * 1000 // Converte para milissegundos
      return Date.now() < exp
    } catch {
      return false
    }
  }

  initialize(): void {
    const token = this.getToken()
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }
}

export const authService = new AuthService()