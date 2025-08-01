<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="400"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="grey-darken-1"
          variant="text"
          @click="$emit('update:modelValue', false)"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="error"
          variant="elevated"
          :loading="loading"
          @click="handleConfirm"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title: string
  message: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()

const handleConfirm = () => {
  emit('confirm')
}
</script>