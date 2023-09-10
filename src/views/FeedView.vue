<script setup lang="ts">
// TODO: This file is where notes from all users will show, not like its setup now

import { ref, onMounted } from 'vue'
import useAuthStore from '@/stores/authStore'
import useNotesStore from '@/stores/notesStore'
import { Note } from '@/types'

const authStore = useAuthStore()
const notesStore = useNotesStore()
const notes = ref()
// Fetch user notes when the component is mounted
onMounted(async () => {
  await notesStore.getAllUserNotes(authStore.userUID)
  notes.value = Object.values(notesStore.userNotes)
})

const recentFirstSort = () => {
  notes.value = notes.value.sort((a: Note, b: Note) => {
    return b.timeStamp.seconds - a.timeStamp.seconds
  })
}
</script>
<template>
  <div v-if="notes" class="text-white">
    <div class="flex gap-2">
      <button @click="recentFirstSort" class="bg-red-500">Reverse Sort</button>
    </div>
    <div v-for="note in notes" :key="note.id">
      <h3>Title: {{ note.title }}</h3>
      <p>Author: {{ note.author }}</p>
      <p>
        Date:
        {{
          note.timeStamp
            .toDate()
            .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        }}
      </p>
    </div>
  </div>
  <div v-else>
    <p>Loading user notes...</p>
  </div>
</template>
