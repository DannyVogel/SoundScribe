<script setup>
import { ref } from 'vue'
import SideNav from './SideNav.vue'
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSideNavShown = ref(false)
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
    <button @click="isSideNavShown = true">
      <i class="fa-solid fa-bars text-white"></i>
    </button>
    <div
      @click="isSideNavShown = false"
      class="absolute w-screen h-screen top-0 left-0 opacity-40 bg-slate-800"
      :class="!isSideNavShown && 'hidden'"
    ></div>
    <SideNav
      @close="isSideNavShown = false"
      class="w-64 h-full p-3 fixed top-0 right-0 bg-gray-900 shadow-md shadow-gray-700 translate-x-0 transition-transform ease-in-out duration-300 flex flex-col justify-start"
      :class="!isSideNavShown && 'translate-x-full'"
    />
  </header>
</template>
