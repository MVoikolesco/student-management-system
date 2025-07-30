<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center">
      <span>Lista de Estudantes</span>
      <v-btn color="primary" prepend-icon="mdi-plus">
        Novo Estudante
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Matrícula</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.registration }}</td>
            <td>
              <v-btn
                icon="mdi-pencil"
                variant="text"
                size="small"
                color="primary"
                @click="editStudent(student.id)"
              />
              <v-btn
                icon="mdi-delete"
                variant="text"
                size="small"
                color="error"
                @click="deleteStudent(student.id)"
              />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Student {
  id: number
  name: string
  email: string
  registration: string
}

const students = ref<Student[]>([])

const editStudent = (id: number) => {
  console.log('Editar estudante:', id)
}

const deleteStudent = (id: number) => {
  console.log('Deletar estudante:', id)
}
</script> 