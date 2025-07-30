<template>
  <v-app>
    <template v-if="authStore.isAuthenticated">
      <v-app-bar color="primary">
        <v-app-bar-title>Sistema de Gestão de Estudantes</v-app-bar-title>
        <v-spacer />
        <v-btn icon @click="authStore.logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer permanent>
        <v-list>
          <v-list-item
            prepend-icon="mdi-account-group"
            title="Estudantes"
            value="students"
            to="/students"
          />
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </template>

    <template v-else>
      <v-main>
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>

<style>
</style> 