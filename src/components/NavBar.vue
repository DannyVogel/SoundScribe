<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const pages = [
  {
    name: 'Feed',
    to: '/feed'
  },
  { name: 'SoundBoard', to: `/soundboard/:${authStore.userName}` },
  { name: 'Discover', to: '/discover' }
]
</script>
<template>
  <div class="flex justify-center gap-2 bg-blue-900 text-sm text-white">
    <nav v-for="(page, index) in pages">
      <RouterLink :to="page.to">{{ page.name }}</RouterLink>
      <span v-if="index !== pages.length - 1"> | </span>
    </nav>
  </div>
</template>
