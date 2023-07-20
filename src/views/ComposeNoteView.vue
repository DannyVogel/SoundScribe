<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { collection, db, doc, addDoc, serverTimestamp } from '@/services/Firebase'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import { getYouTubeEmbedUrl } from '@/utils'

const authStore = useAuthStore()
const router = useRouter()
const isComposing = ref(false)
const note = ref({
  title: '',
  content: '',
  songURL: ''
})

if (!authStore.isLoggedIn) {
  router.push('/')
}

const postNote = async () => {
  isComposing.value = true
  const id = uuidv4()
  const docData = {
    id: id,
    author: authStore.userName,
    timeStamp: serverTimestamp(),
    title: note.value.title,
    content: note.value.content,
    songURL: getYouTubeEmbedUrl(note.value.songURL)
  }
  await addDoc(collection(db, 'users', authStore.userUID, `userNotes`), docData)
  isComposing.value = false
}
</script>
<template>
  <div class="p-3 flex flex-col justify-center sm:max-w-2xl sm:mx-auto text-white">
    <h1>Compose Note</h1>
    <form @submit.prevent="postNote" class="mt-4 sm:max-w-2xl flex flex-col justify-center">
      <fieldset class="w-full px-3 flex flex-col justify-center gap-2.5 border text-black">
        <legend>Your Note</legend>
        <label htmlFor="noteTitle">Title:</label>
        <input v-model="note.title" type="text" name="noteTitle" id="noteTitle" />
        <label htmlFor="noteContent">Content:</label>
        <textarea v-model="note.content" name="noteContent" id="noteContent" rows="10"></textarea>
        <label htmlFor="songURL">Song Link:</label>
        <input v-model="note.songURL" type="text" name="songURL" id="songURL" />
        <button
          class="w-full h-12 rounded bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-xl flex justify-center items-center mb-4"
          :class="isComposing && 'animate-pulse'"
          :disabled="isComposing"
        >
          Compose Note
        </button>
      </fieldset>
    </form>
  </div>
</template>
