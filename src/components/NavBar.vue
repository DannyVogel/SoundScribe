<script setup lang="ts">
import useAuthStore from '@/stores/authStore'

const authStore = useAuthStore()
</script>
<template>
  <nav class="flex justify-center gap-2 text-sm text-white">
    <RouterLink to="/feed">Feed</RouterLink>
    <span>{{ ' | ' }}</span>
    <RouterLink :to="{ name: 'soundBoard', params: { user: authStore.userName } }"
      >SoundBoard
    </RouterLink>
    <span v-if="false">{{ ' | ' }}</span>
    <RouterLink v-if="false" to="/discover">Discover</RouterLink>
  </nav>
</template>
