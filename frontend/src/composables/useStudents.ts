import { ref } from 'vue'
import type { Student, StudentFormData } from '@/types/student'
import { studentService } from '@/services/student.service'

export function useStudents() {
  const students = ref<Student[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchStudents = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await studentService.getAll()
      students.value = response
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Erro ao carregar estudantes'
      console.error('Erro ao carregar estudantes:', e)
    } finally {
      loading.value = false
    }
  }

  const createStudent = async (data: StudentFormData) => {
    loading.value = true
    error.value = null
    try {
      await studentService.create(data)
      await fetchStudents()
      return true
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Erro ao criar estudante'
      console.error('Erro ao criar estudante:', e)
      return false
    } finally {
      loading.value = false
    }
  }

  const updateStudent = async (id: number, data: StudentFormData) => {
    loading.value = true
    error.value = null
    try {
      await studentService.update(id, data)
      await fetchStudents()
      return true
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Erro ao atualizar estudante'
      console.error('Erro ao atualizar estudante:', e)
      return false
    } finally {
      loading.value = false
    }
  }

  const deleteStudent = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await studentService.delete(id)
      await fetchStudents()
      return true
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Erro ao excluir estudante'
      console.error('Erro ao excluir estudante:', e)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    students,
    loading,
    error,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent
  }
}