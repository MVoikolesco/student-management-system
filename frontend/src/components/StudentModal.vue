<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        {{ isEditing ? 'Editar Estudante' : 'Novo Estudante' }}
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
            v-model="formData.cpf"
            label="CPF"
            :rules="[
              v => !!v || 'CPF é obrigatório',
              v => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) || 'CPF deve estar no formato 000.000.000-00',
              v => validateCPF(v) || 'CPF inválido'
            ]"
            :readonly="isEditing"
            :disabled="isEditing"
            :hint="isEditing ? 'CPF não pode ser alterado após o cadastro' : 'Digite apenas números'"
            persistent-hint
            @input="handleCPFInput"
            required
          />

          <v-text-field
            v-model="formData.birthDate"
            label="Data de Nascimento"
            type="date"
            :rules="[
              v => !!v || 'Data de nascimento é obrigatória',
              v => validateBirthDate(v) || 'Data de nascimento inválida. A idade deve estar entre 14 e 120 anos'
            ]"
            :max="maxDate"
            :min="minDate"
            required
          />

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"
              variant="text"
              @click="$emit('update:modelValue', false)"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              :loading="loading"
              @click="handleSubmit"
            >
              {{ isEditing ? 'Atualizar' : 'Cadastrar' }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Student, StudentFormData } from '@/types/student'
import { validateCPF, validateBirthDate, formatCPF } from '@/utils/validators'

// Data mínima (14 anos atrás) e máxima (120 anos atrás) para data de nascimento
const maxDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 14)
  return date.toISOString().split('T')[0]
})

const minDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 120)
  return date.toISOString().split('T')[0]
})

const props = defineProps<{
  modelValue: boolean
  student?: Student
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', data: StudentFormData): void
}>()

const form = ref<any>(null)
const formData = ref<StudentFormData>({
  name: '',
  email: '',
  cpf: '',
  birthDate: ''
})

import { computed } from 'vue'

const isEditing = computed(() => !!props.student)

watch(() => props.student, (newStudent) => {
  if (newStudent) {
    formData.value = {
      name: newStudent.name,
      email: newStudent.email,
      cpf: newStudent.cpf,
      birthDate: newStudent.birthDate
    }
  } else {
    formData.value = {
      name: '',
      email: '',
      cpf: '',
      birthDate: ''
    }
  }
}, { immediate: true })

const handleCPFInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  formData.value.cpf = formatCPF(input.value)
}

const handleSubmit = async () => {
  if (!form.value?.validate()) return
  emit('submit', formData.value)
}
</script>