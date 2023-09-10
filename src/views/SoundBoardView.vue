<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Note } from '@/types'
import ActionBar from '@/common/ActionBar.vue'
import useAuthStore from '@/stores/authStore'
import useNotesStore from '@/stores/notesStore'

const authStore = useAuthStore()

const notesStore = useNotesStore()
const notes = ref()
const currentNote = ref(0)
// Fetch user notes when the component is mounted
onMounted(async () => {
  await notesStore.getAllUserNotes(authStore.userUID)
  notes.value = Object.values(notesStore.userNotes).sort((a: Note, b: Note) => {
    return b.timeStamp.seconds - a.timeStamp.seconds
  })
  console.log(notes.value)
})

const getNewerPost = () => {
  if (currentNote.value > 0) {
    currentNote.value--
  }
}

const getOlderPost = () => {
  if (currentNote.value < notes.value.length - 1) {
    currentNote.value++
  }
}
</script>
<template>
  <div class="max-h-full h-full text-white">
    <div v-if="notes" class="w-full max-h-full h-full grid grid-rows-soundBoard gap-3 mt-2">
      <iframe
        class="w-full h-full"
        :src="notes[currentNote].songURL"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <div class="px-3">
        <h1 class="font-title text-white text-2xl">{{ notes[currentNote].title }}</h1>
        <p class="text-sm text-gray-400">
          {{
            notes[currentNote].timeStamp
              .toDate()
              .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          }}
          - {{ authStore.userName }}
        </p>
      </div>
      <p class="px-3 pb-24 overflow-y-scroll">
        {{ notes[currentNote].content }}
      </p>
    </div>
  </div>
  <div
    class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-800"
  ></div>
  <ActionBar
    v-if="notes"
    :is-newest-note="currentNote === 0"
    :is-oldest-note="currentNote === notes.length - 1"
    @newer="getNewerPost"
    @older="getOlderPost"
  />
</template>
