<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import AppHeader from '@/common/AppHeader.vue'
import AppFooter from '@/common/AppFooter.vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

onMounted(() => {
  authStore.init()
})
</script>

<template>
  <AppLayout>
    <template #header>
      <AppHeader />
    </template>
    <template #main>
      <RouterView />
    </template>
    <template #footer>
      <AppFooter />
    </template>
  </AppLayout>
</template>
