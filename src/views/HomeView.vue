<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
</script>

<template>
  <main class="h-full px-3 flex flex-col justify-center items-center gap-2 bg-blue-400">
    <h1 class="text-lg font-bold">Home</h1>
    <p>Logged in: {{ authStore.isLoggedIn || false }}</p>
    <p>User: {{ authStore.userName || 'N/A' }}</p>
    <p>Account type: {{ authStore.accountType || 'N/A' }}</p>
  </main>
</template>
