<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuthStore from '@/stores/authStore'

const emit = defineEmits(['close'])

const router = useRouter()
const authStore = useAuthStore()

const isLoading = ref(false)
const searchInput = ref('')
const errorMessage = ref()

const searchUser = async () => {
  isLoading.value = true
  const authStore = useAuthStore()
  const UID = await authStore.searchUser(searchInput.value)
  if (!UID) {
    errorMessage.value = 'Scribe not found'
  } else {
    router.push({
      name: 'soundBoard',
      params: { user: searchInput.value }
    })
    emit('close')
  }
  isLoading.value = false
}
</script>
<template>
  <div v-if="isLoading" class="text-white flex flex-col items-center gap-2">
    <p class="font-title text-2xl">Loading...</p>
    <div class="w-8 h-8 border-2 border-t-2 border-gray-200 rounded-full animate-spin"></div>
  </div>
  <div v-else class="w-full flex flex-col items-center gap-4">
    <h1 class="text-xl text-white">Search for a scribe</h1>
    <form @submit.prevent="searchUser" class="w-full max-w-sm text-black" id="user-search-form">
      <input
        v-model="searchInput"
        type="text"
        class="w-full h-8 py-5 rounded px-2 text-center"
        placeholder="Enter Scribe's username"
        id="user-search-input"
      />
    </form>
    <p class="text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<style scoped></style>
