<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import AppHeader from '@/common/AppHeader.vue'
import useAuthStore from '@/stores/authStore'
import useNotesStore from '@/stores/notesStore'

const authStore = useAuthStore()
const notesStore = useNotesStore()

onMounted(() => {
  authStore.init()
})
</script>

<template>
  <AppLayout>
    <template #header>
      <AppHeader />
    </template>
    <template #main>
      <RouterView :key="$route.path" />
    </template>
  </AppLayout>
</template>
