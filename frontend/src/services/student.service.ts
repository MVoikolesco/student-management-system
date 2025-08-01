import api from './api'
import type { Student, StudentFormData } from '@/types/student'

export class StudentService {
  private baseUrl = '/api/students'

  async getAll(): Promise<Student[]> {
    const response = await api.get(this.baseUrl)
    return response.data
  }

  async create(student: StudentFormData): Promise<Student> {
    const response = await api.post(this.baseUrl, student)
    return response.data
  }

  async update(id: number, student: StudentFormData): Promise<Student> {
    const response = await api.put(`${this.baseUrl}/${id}`, student)
    return response.data
  }

  async delete(id: number): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`)
  }
}

export const studentService = new StudentService()