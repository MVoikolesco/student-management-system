<template>
  <v-card class="mb-4 d-flex" flat>
    <v-breadcrumbs :items="items" class="pa-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-slot:title="{ item }">
        <v-breadcrumbs-item
          :to="item.href"
          :disabled="!item.href"
          class="text-no-wrap"
        >
          <v-icon
            v-if="item.icon"
            :icon="item.icon"
            size="small"
            class="me-1"
          />
          {{ item.title }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </v-card>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  title: string
  href?: string
  disabled?: boolean
  icon?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<style lang="scss" scoped>
.v-card {
  height: auto !important;
}
</style>