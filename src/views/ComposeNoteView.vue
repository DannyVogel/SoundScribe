<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { db, doc, setDoc } from '@/services/Firebase'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const isPosting = ref(false)
const post = ref({
  title: '',
  content: '',
  songURL: ''
})

if (!authStore.isLoggedIn) {
  router.push('/')
}

const postNote = () => {
  isPosting.value = true
  setDoc(doc(db, 'posts', authStore.userName), {
    id: uuidv4(),
    title: post.value.title,
    content: post.value.content,
    songURL: post.value.songURL
  })
  isPosting.value = false
}
</script>
<template>
  <div class="p-3 flex flex-col justify-center sm:max-w-2xl sm:mx-auto text-white">
    <h1>Compose Note</h1>
    <form @submit.prevent="postNote" class="mt-4 sm:max-w-2xl flex flex-col justify-center">
      <fieldset class="w-full px-3 flex flex-col justify-center gap-2.5 border">
        <legend>Your Note</legend>
        <label htmlFor="noteTitle">Title:</label>
        <input v-model="post.title" type="text" name="noteTitle" id="noteTitle" />
        <label htmlFor="noteContent">Content:</label>
        <textarea
          v-model="post.content"
          name="noteContent"
          id="noteContent"
          cols="{30}"
          rows="{10}"
        ></textarea>
        <label htmlFor="songURL">Song Link:</label>
        <input v-model="post.songURL" type="text" name="songURL" id="songURL" />
        <button
          class="w-full h-12 rounded bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-xl flex justify-center items-center mb-4"
          :class="isPosting && 'animate-pulse'"
          :disabled="isPosting"
        >
          Compose Note
        </button>
      </fieldset>
    </form>
  </div>
</template>
