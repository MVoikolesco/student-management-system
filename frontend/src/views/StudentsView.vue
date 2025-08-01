<template>
  <v-row>
    <v-col cols="12">
      <Breadcrumbs :items="[
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Módulo Acadêmico' },
        { title: 'Alunos' }
      ]" />
    </v-col>
  </v-row>

  <v-card>
    <v-card-title class="d-flex justify-space-between align-center">
      <span>Lista de Estudantes</span>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="handleCreate">
        Novo Estudante
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th>RA</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr v-for="n in 3" :key="n">
              <td v-for="m in 6" :key="m" class="py-3">
                <v-skeleton-loader type="text" />
              </td>
            </tr>
          </template>
          <template v-else-if="error">
            <tr>
              <td colspan="6" class="text-center text-error py-4">
                {{ error }}
              </td>
            </tr>
          </template>
          <template v-else-if="students.length === 0">
            <tr>
              <td colspan="6" class="text-center py-4">
                Nenhum estudante cadastrado
              </td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="student in students" :key="student.id">
              <td>{{ student.ra }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.cpf }}</td>
              <td>{{ student.email }}</td>
              <td>{{ formatDate(student.birthDate) }}</td>
              <td>
                <v-btn
                  icon="mdi-pencil"
                  variant="text"
                  size="small"
                  color="primary"
                  @click="handleEdit(student)"
                />
                <v-btn
                  icon="mdi-delete"
                  variant="text"
                  size="small"
                  color="error"
                  @click="handleDelete(student.id)"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </v-table>
    </v-card-text>

    <StudentModal
      v-model="showModal"
      :student="selectedStudent"
      :loading="loading"
      @submit="handleSubmit"
    />

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>

    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Confirmar Exclusão"
      message="Tem certeza que deseja excluir este estudante? Esta ação não pode ser desfeita."
      :loading="loading"
      @confirm="confirmDelete"
    />
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentModal from '@/components/StudentModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useStudents } from '@/composables/useStudents'
import type { Student, StudentFormData } from '@/types/student'

const {
  students,
  loading,
  error,
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent
} = useStudents()

const showModal = ref(false)
const selectedStudent = ref<Student | undefined>()
const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

const handleCreate = () => {
  selectedStudent.value = undefined
  showModal.value = true
}

const handleEdit = (student: Student) => {
  selectedStudent.value = student
  showModal.value = true
}

const showDeleteDialog = ref(false)
const studentToDelete = ref<number | null>(null)

const handleDelete = (id: number) => {
  studentToDelete.value = id
  showDeleteDialog.value = true
}

const confirmDelete = async () => {
  if (!studentToDelete.value) return

  const success = await deleteStudent(studentToDelete.value)
  if (success) {
    showSuccess('Estudante excluído com sucesso!')
    showDeleteDialog.value = false
    studentToDelete.value = null
  } else {
    showError(error.value || 'Erro ao excluir estudante')
  }
}

const handleSubmit = async (formData: StudentFormData) => {
  const isEditing = !!selectedStudent.value
  const success = isEditing
    ? await updateStudent(selectedStudent.value.id, formData)
    : await createStudent(formData)

  if (success) {
    showSuccess(`Estudante ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`)
    showModal.value = false
    selectedStudent.value = undefined
  } else {
    showError(error.value || `Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} estudante`)
  }
}

const showSuccess = (text: string) => {
  snackbar.value = {
    show: true,
    text,
    color: 'success'
  }
}

const showError = (text: string) => {
  snackbar.value = {
    show: true,
    text,
    color: 'error'
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

onMounted(async () => {
  console.log('StudentsView montada')
  try {
    await fetchStudents()
    console.log('Estudantes carregados:', students.value)
  } catch (e) {
    console.error('Erro ao carregar estudantes:', e)
  }
})
</script> 