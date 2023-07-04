<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  db,
  doc,
  setDoc,
  serverTimestamp
} from '@/services/Firebase'
import { useToast, TYPE } from 'vue-toastification'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const isSigningUp = ref(false)
const errorMessage = ref('')
const btnMessage = ref('')
const form = ref({
  userName: '',
  email: '',
  password: '',
  accountType: ''
})

async function processSignUpFormData() {
  btnMessage.value = 'Creating Account...'
  isSigningUp.value = true
  const res = await authStore.signUp(form.value)
  if (res === 'success') {
    toast(`Welcome ${form.value.userName}!`, {
      type: TYPE.SUCCESS
    })
    router.push('/')
  } else {
    errorMessage.value = res
  }
  btnMessage.value = ''
  isSigningUp.value = false
  // ..
}
</script>
<template>
  <div class="bg-blue-400 p-3 sm:pt-20 h-full">
    <h1 class="text-center text-3xl font-bold">Join SoundScribe</h1>
    <form @submit.prevent="processSignUpFormData" class="mt-4 sm:max-w-lg sm:mx-auto">
      <fieldset class="w-full px-3 flex flex-col justify-center gap-2.5 border">
        <legend>Sign Up</legend>
        <div class="sm:mx-auto sm:w-80 flex flex-col justify-center gap-2.5">
          <label htmlFor="userName">User Name:</label>
          <input
            v-model="form.userName"
            class="sm:max-w-sm"
            type="text"
            name="userName"
            id="userName"
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            v-model="form.email"
            class="sm:max-w-sm"
            type="email"
            name="email"
            id="email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            v-model="form.password"
            class="sm:max-w-sm"
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <fieldset
          class="w-[190px] p-2 text-center flex items-center justify-around mx-auto my-0 border"
        >
          <legend>Sounder or Scribe?</legend>
          <input v-model="form.accountType" type="radio" value="Sounder" required />
          <input v-model="form.accountType" type="radio" value="Scribe" required />
        </fieldset>
        <div class="grid grid-cols-2 gap-4">
          <div class="h-60 flex flex-col items-center flex-1">
            <div class="flex items-center justify-center gap-4 py-2">
              <img
                class="w-5"
                src="../assets/icons/sounder.png"
                alt="sounder icon; image of soundwaves with musical notes"
              />
              <p class="text-center font-bold">Sounders</p>
            </div>
            <p class="text-center">
              Enjoy the sounds posted by Scribes, hand out likes (🎶) and leave comments. You can
              always upgrade to Scribe at any time.
            </p>
          </div>
          <div class="h-60 flex flex-col items-center flex-1">
            <div class="flex items-center justify-center gap-4 py-2">
              <div class="user-header-container">
                <img
                  class="w-5"
                  src="../assets/icons/scribe2.png"
                  alt="scribe icon; image of a music note on a sheet with a pencil"
                />
              </div>
              <p class="text-center font-bold">Scribes</p>
            </div>
            <p class="text-center">
              Create notes, leaving your thoughts and favorite sounds in a note. Comment on and like
              (🎶) other Scribe's notes.
            </p>
          </div>
        </div>
        <p class="text-center text-red-600 font-bold">{{ errorMessage }}</p>
        <button
          class="w-full h-12 rounded bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xl flex justify-center items-center mb-4"
          :class="isSigningUp && 'animate-pulse'"
          :disabled="isSigningUp"
        >
          {{ isSigningUp ? btnMessage : 'Create Account' }}
        </button>
      </fieldset>
    </form>
  </div>
</template>
