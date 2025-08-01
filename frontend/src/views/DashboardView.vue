<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-h4 mb-4">Dashboard</h1>
      
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="text-primary">
              <v-icon start color="primary" icon="mdi-account-circle" class="me-2" />
              Bem-vindo!
            </v-card-title>
            <v-card-text>
              <p class="text-h6 mb-4">Olá, {{ auth.user?.name }}!</p>
              <p class="text-body-1">Bem-vindo ao Sistema de Gestão Acadêmica. Aqui você pode gerenciar todos os aspectos relacionados aos estudantes.</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="text-primary">
              <v-icon start color="primary" icon="mdi-lightning-bolt" class="me-2" />
              Ações Rápidas
            </v-card-title>
            <v-card-text style="padding: 16px; max-height: 68px;">
              <v-btn
                color="primary"
                prepend-icon="mdi-account-group"
                :to="{ name: 'students' }"
                class="text-none"
                block
                size="default"
              >
                Gerenciar Alunos
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!--
      <v-row class="mt-4">
        <v-col cols="12">
          <v-card>
            <v-card-title>Estatísticas</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-card variant="outlined">
                    <v-card-text class="text-center">
                      <div class="text-h4 mb-2">0</div>
                      <div class="text-body-1">Alunos Cadastrados</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      -->
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>