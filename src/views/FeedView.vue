<script setup>
import { onMounted } from 'vue'
import useAuthStore from '@/stores/authStore'
import useNotesStore from '@/stores/notesStore'

const authStore = useAuthStore()
const notesStore = useNotesStore()

// Fetch user notes when the component is mounted
onMounted(() => {
  notesStore.getAllUserNotes(authStore.userUID)
})

// Access the userNotes Map from the store
const userNotes = notesStore.userNotes
</script>
<template>
  <div v-if="userNotes.size > 0">
    <div v-for="(note, noteId) in userNotes" :key="noteId">
      <h3>Title: {{ note.title }}</h3>
      <p>Content: {{ note.content }}</p>
      <p>Author: {{ note.author }}</p>
    </div>
  </div>
  <div v-else>
    <p>Loading user notes...</p>
  </div>
</template>
