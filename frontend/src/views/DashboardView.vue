<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-h4 mb-4">Dashboard</h1>
      
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text>
              <p class="text-h6">Bem-vindo ao Sistema Acadêmico, {{ auth.user?.name }}!</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Ações Rápidas</v-card-title>
            <v-card-text>
              <v-btn
                color="primary"
                block
                prepend-icon="mdi-account-plus"
                :to="{ name: 'students' }"
                class="mb-2"
              >
                Cadastrar Novo Aluno
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

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
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>