<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>
<template>
  <nav class="flex justify-center gap-1 text-sm text-white">
    <RouterLink to="/feed">Feed</RouterLink>
    <span>{{ ' | ' }}</span>
    <div v-if="authStore.userName">
      <RouterLink :to="{ name: 'soundBoard', params: { user: authStore.userName } }"
        >SoundBoard
      </RouterLink>
      <span>{{ ' | ' }}</span>
    </div>
    <RouterLink to="/discover">Discover</RouterLink>
  </nav>
</template>
