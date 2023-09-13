<script setup lang="ts">
import useAuthStore from '@/stores/authStore'
import SearchScribe from '@/common/SearchScribe.vue'
const authStore = useAuthStore()
</script>

<template>
  <main class="h-full py-12 px-3 flex flex-col items-center gap-2 bg-gray-800 text-white">
    <h1 class="text-4xl font-title animate-pulse">SoundScribe</h1>
    <p class="text-center">Where music meets storytelling.</p>
    <p class="text-center">
      Check out the latest Notes in the Feed or search for a specific Scribe below.
    </p>
    <p class="text-center">
      You can log in or create an account in the side menu by clicking the icon on the top-right.
    </p>
    <SearchScribe class="mt-4" />
  </main>
</template>
