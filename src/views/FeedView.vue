<script setup>
import { onMounted } from 'vue'
import useAuthStore from '@/stores/authStore'
import useNotesStore from '@/stores/notesStore'

const authStore = useAuthStore()
const notesStore = useNotesStore()

// Fetch user notes when the component is mounted
onMounted(async () => {
  await notesStore.getAllUserNotes(authStore.userUID)
  console.log(notesStore.userNotes)
})
</script>
<template>
  <div v-if="notesStore.userNotes.size > 0" class="text-white">
    <div v-for="[key, note] in notesStore.userNotes" :key="key">
      <h3>Title: {{ note.title }}</h3>
      <p>Author: {{ note.author }}</p>
      <p>Content: {{ note.content }}</p>
    </div>
  </div>
  <div v-else>
    <p>Loading user notes...</p>
  </div>
</template>
