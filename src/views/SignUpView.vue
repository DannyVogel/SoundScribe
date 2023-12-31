<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuthStore from '@/stores/authStore'
import { useToast, TYPE } from 'vue-toastification'
import { usernameRegex, passwordRegex, emailRegex } from '@/utils'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/20/solid'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const isSigningUp = ref(false)
const showPassword = ref(false)
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
  errorMessage.value = ''

  if (!usernameRegex.test(form.value.userName)) {
    errorMessage.value =
      'User name must be at least 3 characters long and contain no spaces or invalid characters'
    btnMessage.value = 'Create Account'
    isSigningUp.value = false
    return
  }

  if (!emailRegex.test(form.value.email)) {
    errorMessage.value = 'Please enter a valid email address'
    btnMessage.value = 'Create Account'
    isSigningUp.value = false
    return
  }

  if (!passwordRegex.test(form.value.password)) {
    errorMessage.value =
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    btnMessage.value = 'Create Account'
    isSigningUp.value = false
    return
  }

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
  <div class="bg-gray-800 p-3 sm:pt-20 h-full overflow-scroll text-white">
    <h1 class="text-center text-3xl font-bold">Join SoundScribe</h1>
    <form
      @submit.prevent="processSignUpFormData"
      class="mt-4 sm:max-w-lg sm:mx-auto"
      id="sign-up-form"
    >
      <fieldset class="w-full px-3 flex flex-col justify-center gap-2.5 border rounded">
        <legend class="px-2">Sign Up</legend>
        <div class="sm:mx-auto sm:w-80 flex flex-col justify-center gap-2.5">
          <label htmlFor="userName">User Name:</label>
          <input
            v-model="form.userName"
            class="w-full text-black px-2 py-2 sm:max-w-sm bg-white placeholder:text-gray-400 rounded-t border-0"
            type="text"
            name="userName"
            id="userName"
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            v-model="form.email"
            class="w-full text-black px-2 py-2 sm:max-w-sm bg-white placeholder:text-gray-400 rounded-t border-0"
            type="email"
            name="email"
            id="email"
            required
          />
          <label htmlFor="password">Password:</label>
          <div class="relative mt-1">
            <input
              v-model="form.password"
              class="w-full text-black px-2 py-2 sm:max-w-sm bg-white placeholder:text-gray-400 rounded-t border-0"
              name="password"
              id="password"
              required
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              autocomplete="current-password"
            />
            <div
              class="w-8 cursor-pointer absolute inset-y-0 right-0 flex items-center justify-center"
            >
              <EyeIcon
                @click="showPassword = !showPassword"
                class="w-4 text-orange-500"
                v-if="showPassword"
              />
              <EyeSlashIcon
                @click="showPassword = !showPassword"
                class="w-4 text-orange-500"
                v-else
              />
            </div>
          </div>
        </div>
        <fieldset
          class="w-[190px] p-2 text-center flex items-center justify-around mx-auto my-0 border rounded"
        >
          <legend class="px-2">Sounder or Scribe?</legend>
          <input
            v-model="form.accountType"
            type="radio"
            value="Sounder"
            required
            id="account-type-sounder"
          />
          <input
            v-model="form.accountType"
            type="radio"
            value="Scribe"
            required
            id="account-type-scribe"
          />
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
              Enjoy the sounds posted by Scribes, hand out likes
              <img
                src="@/assets/icons/musical-note.png"
                class="w-5 inline"
                alt="musical note icon"
              />
              and leave comments. You can always upgrade to Scribe at any time.
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
              <img
                src="@/assets/icons/musical-note.png"
                class="w-5 inline"
                alt="musical note icon"
              />
              other Scribe's notes.
            </p>
          </div>
        </div>
        <p class="text-center text-red-600 font-bold">{{ errorMessage }}</p>
        <button
          class="w-full h-12 rounded bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-xl flex justify-center items-center mb-4"
          :class="isSigningUp && 'animate-pulse'"
          :disabled="isSigningUp"
        >
          {{ isSigningUp ? btnMessage : 'Create Account' }}
        </button>
      </fieldset>
    </form>
  </div>
</template>
