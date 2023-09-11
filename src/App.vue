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
<style>
/* html {
  overflow-x: hidden;
} */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: transparent !important;
}

::-webkit-scrollbar-track {
  border-radius: 1rem;
  margin: 0.4rem;
  margin-top: 0.4rem;
  border-left: 1px solid rgba(211, 211, 211, 0);
}

::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: linear-gradient(30deg, #ea580c, #ea580c);
  box-shadow: inset 0 0 6px #ea580c;
}
</style>
