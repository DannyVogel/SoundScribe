<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Note } from '@/types'
import { uuidv4Regex } from '@/utils'
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'
import ActionBar from '@/common/ActionBar.vue'
import SearchScribe from '@/common/SearchScribe.vue'
import useAuthStore from '@/stores/authStore'
import useNotesStore from '@/stores/notesStore'
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

const authStore = useAuthStore()
const notesStore = useNotesStore()
const router = useRouter()

const isLoading = ref(false)
const currentScribe = ref()
const notes = ref<Note[]>([])
const currentNote = ref(0)
const showComments = ref(false)
const isLiked = ref(false)

onMounted(async () => {
  isLoading.value = true
  await getNotes()
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

const getNotes = async () => {
  const currentPath = router.currentRoute.value.path.toString().split('/')
  const pathEnd = currentPath[currentPath.length - 1]
  let user = null
  let noteId: string | null = null

  if (pathEnd === 'soundboard') {
    currentScribe.value = null
    return
  }

  // If the path ends with a uuidv4, user wants to view a specific note
  if (uuidv4Regex.test(pathEnd)) {
    noteId = currentPath[currentPath.length - 1]
    user = currentPath[currentPath.length - 2]
  } else {
    user = currentPath[currentPath.length - 1]
  }
  const UID = await authStore.searchUser(user)
  if (!UID) return

  // If we have a noteID and a user, get users notes and show the specific note
  if (noteId && user !== 'soundboard') {
    currentScribe.value = user

    await notesStore.getAllUserNotes(UID)
    notes.value = Object.values(notesStore.userNotes)
    currentNote.value = notes.value.findIndex((note: Note) => note.id === noteId)
    return
  }

  // No noteID, get all users notes and show the newest
  if (!noteId && user !== 'soundboard') {
    currentScribe.value = user
    await notesStore.getAllUserNotes(UID)
    notes.value = Object.values(notesStore.userNotes).sort((a: Note, b: Note) => {
      return b.timeStamp.seconds - a.timeStamp.seconds
    })
    return
  }
}

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
  <div class="w-full max-h-full h-full text-white overflow-y-hidden">
    <div
      v-if="isLoading"
      class="max-h-full h-full text-white flex flex-col justify-center items-center gap-4"
    >
      <p class="font-title text-2xl">Loading...</p>
      <div class="w-8 h-8 border-2 border-t-2 border-gray-200 rounded-full animate-spin"></div>
    </div>
    <div v-else-if="!currentScribe" class="max-h-full h-full w-full max-w-xs mx-auto py-8">
      <SearchScribe />
    </div>
    <Transition v-else-if="notes.length > 0">
      <div
        class="w-full max-h-full h-full grid grid-rows-soundBoard md:grid-rows-soundBoardLg gap-3 mt-2"
        :key="notes[currentNote].id"
      >
        <LiteYouTubeEmbed :id="notes[currentNote].songURL" title="YouTube video player" />

        <div class="px-3 flex items-end">
          <div class="flex flex-col flex-nowrap overflow-hidden">
            <h1 class="font-title text-white text-2xl truncate">
              {{ notes[currentNote].title }}
            </h1>
            <p class="text-sm text-gray-400">
              {{
                notes[currentNote].timeStamp
                  .toDate()
                  .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              }}
              - {{ notes[currentNote].author }}
            </p>
          </div>
          <div class="ml-auto flex flex-col gap-2">
            <div class="text-sm text-gray-400 flex gap-2">
              <ChatBubbleLeftRightIcon
                class="w-5 cursor-pointer"
                @click="showComments = !showComments"
              />
              {{ notes[currentNote].comments.length }}
            </div>
            <div class="text-sm text-gray-400 flex gap-2">
              <img
                @click="isLiked = !isLiked"
                src="@/assets/icons/musical-note.png"
                class="w-5 cursor-pointer"
                alt="musical note icon"
              />
              {{ notes[currentNote].likedBy?.length }}
            </div>
          </div>
        </div>
        <p v-html="notes[currentNote].content" class="px-3 pb-24 overflow-y-scroll"></p>
      </div>
    </Transition>
    <div v-else>
      <h1 class="mt-8 text-center font-title text-2xl">
        {{ currentScribe }} has not composed any notes yet
      </h1>
      <div class="w-full flex justify-center">
        <RouterLink
          :to="{
            name: 'feed'
          }"
          class="mt-4 text-xl hover:text-orange-600"
          >Back to Feed
        </RouterLink>
      </div>
    </div>
  </div>
  <div
    class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-800"
  ></div>
  <ActionBar
    v-if="currentScribe && notes[currentNote]"
    :is-newest-note="currentNote === 0"
    :is-oldest-note="currentNote === notes.length - 1"
    :note="notes[currentNote]"
    :show-comments="showComments"
    :is-liked="isLiked"
    @newer="getNewerPost"
    @older="getOlderPost"
  />
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
