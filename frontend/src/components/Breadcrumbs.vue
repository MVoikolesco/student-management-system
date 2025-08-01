<template>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    <template v-slot:title="{ item }">
      <v-breadcrumbs-item
        :to="item.href"
        :disabled="!item.href"
      >
        {{ item.title }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  title: string
  href?: string
  disabled?: boolean
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>