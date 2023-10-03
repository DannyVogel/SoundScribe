<script setup lang="ts">
import { ref } from 'vue'
import SideNav from './SideNav.vue'
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'
import { Bars3Icon } from '@heroicons/vue/24/solid'

const router = useRouter()
const isSideNavShown = ref(false)
</script>

<template>
  <header
    class="h-full px-2 flex justify-between items-center bg-gray-900 border-b-2 border-orange-600"
  >
    <div class="w-full flex items-center justify-between">
      <h1
        @click="router.push('/')"
        class="w-fit font-title text-white text-2xl cursor-pointer hover:animate-pulse"
        to="/"
      >
        SoundScribe
      </h1>
      <NavBar />
      <div class="flex items-start justify-end sm:w-[107px]">
        <button
          @click="isSideNavShown = true"
          class="w-8 h-8"
          title="side menu button"
          aria-label="side menu button"
        >
          <Bars3Icon class="text-white" />
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
      </div>
    </div>
  </header>
</template>
