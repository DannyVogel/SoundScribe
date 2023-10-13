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
      Check out the latest Notes in the
      <RouterLink :to="{ name: 'feed' }" class="text-orange-500 hover:text-orange-600"
        >Feed</RouterLink
      >
      or search for a Scribe below.
    </p>
    <p class="text-center">
      Take a look at the official
      <RouterLink
        :to="{
          name: 'soundBoard',
          params: { user: 'SoundScribe', id: '322a246e-bf1a-4d27-8fcb-0ea53773887f' }
        }"
        class="text-orange-500 hover:text-orange-600"
        >SoundScribe</RouterLink
      >
      account's notes to get a feel for the site.
    </p>
    <p class="text-center">
      Log in via the side menu by clicking the icon on the top-right or
      <RouterLink :to="{ name: 'signUp' }" class="text-orange-500 hover:text-orange-600"
        >create an account</RouterLink
      >.
    </p>
  </main>
</template>
