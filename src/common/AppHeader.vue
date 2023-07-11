<script setup>
import SideNav from './SideNav.vue'
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <header
    class="h-full p-2 flex justify-between items-center bg-gray-900 border-b-2 border-orange-600"
  >
    <h1
      @click="router.push('/')"
      class="font-title text-white text-2xl cursor-pointer hover:animate-pulse"
      to="/"
    >
      SoundScribe
    </h1>
    <NavBar />
    <SideNav />
  </header>
</template>
