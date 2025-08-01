<template>
  <v-form ref="form" @submit.prevent="handleSubmit">
    <v-text-field
      v-if="isEditing && student?.ra"
      :model-value="student.ra"
      label="RA"
      readonly
      disabled
    />

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
      :model-value="formData.cpf"
      @update:model-value="handleCPFInput"
      label="CPF"
      :rules="[
        v => !!v || 'CPF é obrigatório',
        v => !v || /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) || 'CPF deve estar no formato 000.000.000-00',
        v => !v || v.replace(/\D/g, '').length === 11 || 'CPF deve ter 11 dígitos'
      ]"
      maxlength="14"
      required
      :readonly="isEditing"
      :disabled="isEditing"
      :hint="isEditing ? 'CPF não pode ser alterado após o cadastro' : ''"
      persistent-hint
    />

    <v-text-field
      v-model="formData.birthDate"
      label="Data de Nascimento"
      type="date"
      :rules="[v => !!v || 'Data de nascimento é obrigatória']"
      required
    />

    <v-card-actions>
      <v-spacer />
      <v-btn color="error" text @click="$emit('cancel')">Cancelar</v-btn>
      <v-btn color="primary" type="submit" :loading="loading">
        {{ isEditing ? 'Atualizar' : 'Cadastrar' }}
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Student, StudentFormData } from '@/types/student'
import { maskCPF } from '@/utils/masks'

const props = defineProps<{
  student?: Student
  isEditing: boolean
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: StudentFormData): void
  (e: 'cancel'): void
}>()

const form = ref<any>(null)
const formData = ref<StudentFormData>({
  name: '',
  email: '',
  cpf: '',
  birthDate: ''
})

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    cpf: '',
    birthDate: ''
  }
}

watch(() => props.student, (newStudent) => {
  if (newStudent) {
    formData.value = {
      name: newStudent.name,
      email: newStudent.email,
      cpf: newStudent.cpf,
      birthDate: newStudent.birthDate
    }
  } else {
    resetForm()
  }
}, { immediate: true })

// Limpa o formulário quando o modal é fechado
watch(() => props.isEditing, (newValue) => {
  if (!newValue) {
    resetForm()
  }
}, { immediate: true })

const handleCPFInput = (value: string) => {
  formData.value.cpf = maskCPF(value)
}

const handleSubmit = async () => {
  if (!form.value?.validate()) return
  emit('submit', formData.value)
}
</script>