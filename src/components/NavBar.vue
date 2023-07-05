<script setup>
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const pages = [
  {
    name: 'Feed',
    to: '/feed',
    loggedIn: false
  },
  { name: 'SoundBoard', to: `/soundboard/:${authStore.userName}`, loggedIn: true },
  { name: 'Discover', to: '/discover', loggedIn: false }
]
</script>
<template>
  <div class="flex justify-center gap-1 bg-blue-900 text-sm text-white">
    <nav v-for="(page, index) in pages" :key="index">
      <template v-if="!page.loggedIn || (page.loggedIn && authStore.isLoggedIn)">
        <RouterLink :to="page.to">{{ page.name }}</RouterLink>
        <span :class="!authStore.isLoggedIn && 'pl-1'" v-if="index !== pages.length - 1">{{
          ' | '
        }}</span>
      </template>
    </nav>
  </div>
</template>
