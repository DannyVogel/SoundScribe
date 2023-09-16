<script setup lang="ts">
import { ref } from 'vue'
import useAuthStore from '@/stores/authStore'
import useNotesStore from '@/stores/notesStore'
import { useRouter } from 'vue-router'
import { youtubeUrlRegex } from '@/utils'

const authStore = useAuthStore()
const notesStore = useNotesStore()
const router = useRouter()
const isUploading = ref(false)
const errorMessage = ref('')
const note = ref({
  title: '',
  content: '',
  songURL: ''
})

const getYoutubeVideoId = (url: string) => {
  const match = url.match(youtubeUrlRegex)

  if (match) {
    const videoId = match[1] || match[2] || match[3] || match[4]
    return 'https://www.youtube.com/watch?v=' + videoId
  }

  return null
}

if (!authStore.isLoggedIn) {
  router.push('/')
}

const uploadNote = async () => {
  isUploading.value = true
  if (!note.value.title) {
    isUploading.value = false
    errorMessage.value = 'Please enter a title.'
    return
  }

  if (note.value.title.length > 25) {
    isUploading.value = false
    errorMessage.value = 'Please enter a title that is less than 25 characters.'
    return
  }

  if (!note.value.content) {
    isUploading.value = false
    errorMessage.value = 'Please enter some content.'
    return
  }
  const youtubeURL = getYoutubeVideoId(note.value.songURL)
  if (!youtubeURL) {
    isUploading.value = false
    errorMessage.value =
      'Please enter a valid YouTube URL. (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ)'
    return
  }
  note.value.songURL = youtubeURL
  const res = await notesStore.uploadNote(
    authStore.userName,
    note.value.title,
    note.value.content,
    note.value.songURL,
    authStore.userUID
  )
  if (res === 'success') {
    router.push(`/soundboard/${authStore.userName}`)
  } else {
    errorMessage.value = 'Something went wrong. Please try again.'
  }
  isUploading.value = false
}
</script>
<template>
  <div class="w-full p-2 flex flex-col justify-center sm:max-w-2xl sm:mx-auto text-white">
    <h1>Compose Note</h1>
    <form
      @submit.prevent="uploadNote"
      class="w-full mt-4 sm:max-w-2xl flex flex-col justify-center"
    >
      <fieldset
        class="w-full max-w-sm sm:max-w-xl px-3 flex flex-col justify-center gap-2.5 border"
      >
        <legend>Your Note</legend>
        <label htmlFor="songURL">Song Link:</label>
        <input v-model="note.songURL" type="text" name="songURL" id="songURL" class="text-black" />
        <label htmlFor="noteTitle">Title:</label>
        <input
          v-model="note.title"
          type="text"
          name="noteTitle"
          id="noteTitle"
          class="text-black"
        />
        <label htmlFor="noteContent">Content:</label>
        <div class="max-w-full">
          <QuillEditor
            v-model:content="note.content"
            contentType="html"
            theme="snow"
            :options="{ placeholder: 'Compose your Note' }"
            class="text-white w-full"
          />
        </div>
        <p class="text-red-500 text-xs">
          {{ errorMessage }}
        </p>
        <button
          class="w-full h-12 rounded bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-xl flex justify-center items-center mb-4"
          :class="isUploading && 'animate-pulse'"
          :disabled="isUploading"
        >
          Compose Note
        </button>
      </fieldset>
    </form>
  </div>
</template>

<style>
.ql-container {
  width: 100%;
  min-height: 10rem;
  height: 100%;
  flex: 1;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  word-break: break-all;
}

.ql-editor {
  width: 100%;
  height: 100%;
  flex: 1;
  flex-wrap: wrap;
  overflow-y: auto;
  word-break: break-all;
}

.ql-snow {
  width: 100%;
}
</style>
