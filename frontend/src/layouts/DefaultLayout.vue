<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="dashboard"
          to="/dashboard"
        />
        
        <v-list-subheader>Módulo Acadêmico</v-list-subheader>
        <v-list-item
          prepend-icon="mdi-account-school"
          title="Alunos"
          value="students"
          to="/students"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Sistema Acadêmico</v-toolbar-title>
      <v-spacer />
      
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="primary" size="small">
              <span class="text-h6">{{ userInitials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="handleLogout">
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const drawer = ref(true)
const auth = useAuthStore()

const userInitials = computed(() => {
  if (!auth.user?.name) return ''
  return auth.user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
})

const handleLogout = () => {
  auth.logout()
}
</script>