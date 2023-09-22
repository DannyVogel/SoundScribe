<script setup lang="ts">
// TODO: This file is where notes from all users will show, not like its setup now

import { ref, onMounted, watchEffect } from 'vue'
import { youtubeUrlRegex } from '@/utils'
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'
import { Note } from '@/types'
import useAuthStore from '@/stores/authStore'
import useNotesStore from '@/stores/notesStore'

const authStore = useAuthStore()
const notesStore = useNotesStore()
const notes = ref(null as Note[] | null)
// Fetch user notes when the component is mounted
onMounted(async () => {
  await notesStore.getAllNotes()
})

watchEffect(() => {
  notes.value = notesStore.getAllUsersNotesSortedByTimestamp
})

function getYoutubeVideoId(url: string) {
  const match = url.match(youtubeUrlRegex)

  if (match) {
    const videoId = match[1] || match[2] || match[3] || match[4]
    return videoId
  }

  return ''
}

function getTimeAgo(timestamp) {
  const currentTime = new Date().getTime()
  const timeDifference = currentTime - timestamp.seconds * 1000

  const seconds = Math.floor(timeDifference / 1000)
  if (seconds < 60) {
    return `${seconds} seconds ago`
  }

  const minutes = Math.floor(timeDifference / (1000 * 60))
  if (minutes < 60) {
    return `${minutes} minutes ago`
  }

  const hours = Math.floor(timeDifference / (1000 * 60 * 60))
  if (hours < 12) {
    return `${hours} hours ago`
  }

  const date = new Date(timestamp.seconds * 1000)
  const options = { month: 'short', day: 'numeric', year: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}
</script>
<template>
  <div
    v-if="!notes"
    class="max-h-full h-full text-white flex flex-col justify-center items-center gap-4"
  >
    <p class="font-title text-2xl">Loading...</p>
    <div class="w-8 h-8 border-2 border-t-2 border-gray-200 rounded-full animate-spin"></div>
  </div>
  <div v-else class="text-white mt-1">
    <div v-for="note in notes" :key="note.id">
      <RouterLink
        :to="`/soundboard/${note.author}/${note.id}`"
        class="bg-gray-900 rounded-lg p-2 py-4 mb-1 flex gap-2 sm:gap-3 shadow-lg border-b-2 border-orange-600"
      >
        <img
          class="my-auto w-32 h-16 object-cover rounded-full shrink-0"
          :src="`http://img.youtube.com/vi/${getYoutubeVideoId(note.songURL)}/0.jpg`"
        />
        <div class="grow flex flex-col justify-center gap-2">
          <p class="underline text-xs sm:text-sm">{{ note.author }}</p>
          <h3 class="text-sm sm:text-base font-bold text-orange-600">{{ note.title }}</h3>
          <div class="flex items-center">
            <p class="text-xs sm:text-sm font-light">
              {{ getTimeAgo(note.timeStamp) }}
            </p>
            <div class="ml-auto text-sm text-gray-400 flex gap-2">
              <div class="text-sm text-gray-400 flex gap-2">
                <ChatBubbleLeftRightIcon class="w-5" />
                {{ note.comments.length }}
              </div>
              <img src="@/assets/icons/musical-note.png" class="w-5" /> {{ note.likedBy?.length }}
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
