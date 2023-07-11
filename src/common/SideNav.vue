<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useToast, TYPE } from 'vue-toastification'
import { useRouter } from 'vue-router'

defineEmits(['close'])
const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const isSideNavShown = ref(false)
const isSigningIn = ref(false)
const signingInMessage = ref('')
const isLoggingOut = ref(false)
const loggingOutMessage = ref('')
const errorMessage = ref('')
const form = ref({
  email: '',
  password: ''
})

const processSignInFormData = async () => {
  errorMessage.value = ''
  signingInMessage.value = 'Verifying...'
  isSigningIn.value = true

  const res = await authStore.signIn(form.value.email, form.value.password)
  if (res === 'success') {
    toast(`Welcome back ${authStore.userName}!`, {
      type: TYPE.SUCCESS
    })
    signingInMessage.value = 'Success!'
    setTimeout(() => {
      isSideNavShown.value = false
      isSigningIn.value = false
    }, 1000)
    setTimeout(() => {
      signingInMessage.value = ''
    }, 2000)
    router.push('/')
  } else {
    isSigningIn.value = false
    errorMessage.value = 'Incorrect email or password. Please verify and try again.'
  }
}

const logOut = async () => {
  loggingOutMessage.value = 'Logging out...'
  isLoggingOut.value = true
  const res = await authStore.logOut()
  if (res === 'success') {
    // Sign-out successful.
    toast('Logged out successfully!', {
      type: TYPE.SUCCESS
    })
    loggingOutMessage.value = ''
    isLoggingOut.value = false
    isSideNavShown.value = false
    router.push('/')
  } else {
    loggingOutMessage.value = 'Error: Please try again'
    isLoggingOut.value = false
  }
}
</script>

<template>
  <div>
    <button @click="$emit('close')" class="h-12 flex justify-center">
      <i class="fa-solid fa-bars text-white"></i>
    </button>

    <div v-if="authStore.isLoggedIn" class="h-full flex flex-col items-center gap-4">
      <div class="w-full text-white flex flex-col justify-center items-center">
        <p>Welcome back</p>
        <p>{{ authStore.userName }}</p>
      </div>
      <RouterLink
        v-if="authStore.accountType === 'Scribe'"
        @click="isSideNavShown = false"
        :to="`/soundboard/${authStore.userName}`"
        class="w-full h-8 py-5 rounded bg-orange-500 hover:bg-orange-600 hover:border-b hover:border-b-white cursor-pointer text-white text-base flex justify-center items-center gap-2"
      >
        <p>🎶 Visit SoundBoard</p>
      </RouterLink>
      <RouterLink
        v-if="authStore.accountType === 'Scribe'"
        @click="isSideNavShown = false"
        :to="{ name: 'postNote' }"
        class="w-full h-8 py-5 rounded bg-orange-500 hover:bg-orange-600 hover:border-b hover:border-b-white cursor-pointer text-white text-base flex justify-center items-center gap-2"
      >
        <i class="fa-regular fa-pen-to-square"></i>
        <p>Compose Note</p>
      </RouterLink>
      <button
        @click="logOut"
        class="w-full h-8 mt-auto mb-4 rounded bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-base"
        :class="isLoggingOut && 'animate-pulse'"
        :disabled="isLoggingOut"
      >
        {{ isLoggingOut ? loggingOutMessage : 'Sign Out' }}
      </button>
    </div>
    <div v-else>
      <form @submit.prevent="processSignInFormData">
        <fieldset
          class="w-full px-3 pb-3 flex flex-col justify-center items-start gap-2.5 text-white border border-white"
        >
          <legend>Sign In</legend>
          <label htmlFor="signInEmail">Email:</label>
          <input
            v-model="form.email"
            type="email"
            name="signInEmail"
            id="signInEmail"
            class="w-full h-8 text-sm placeholder:px-3 text-black"
            placeholder="e.g example@mail.com"
          />
          <label htmlFor="signInPassword">Password:</label>
          <input
            v-model="form.password"
            type="password"
            name="signInPassword"
            id="signInPassword"
            class="w-full h-8 text-sm placeholder:px-3 text-black"
            placeholder="Make it strong"
          />
          <p class="w-full text-center text-xs font-bold text-red-600">{{ errorMessage }}</p>
          <button
            class="w-full h-8 rounded bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-base"
            :class="isSigningIn && 'animate-pulse'"
            :disabled="isSigningIn"
          >
            {{ isSigningIn ? 'Verifying...' : 'Sign In' }}
          </button>
        </fieldset>
      </form>
      <div class="flex flex-col gap-2 mt-4">
        <p class="text-white text-center">New user?</p>
        <RouterLink
          :to="{ name: 'signup' }"
          @click.stop="isSideNavShown = false"
          class="w-full h-8 rounded bg-orange-500 hover:bg-orange-600 cursor-pointer text-white text-base flex justify-center items-center"
          >Sign up here</RouterLink
        >
      </div>
    </div>
    <footer class="mt-auto w-full h-6 flex justify-between items-center">
      <p class="text-white">&#169; 2023 SoundScribe</p>
      <div class="flex gap-4">
        <a href="https://github.com/DannyVogel" target="_blank"
          ><i class="fa-brands fa-github text-white hover:scale-150 cursor-pointer"></i
        ></a>
        <a href="https://www.linkedin.com/in/danny-vogel/" target="_blank"
          ><i class="fa-brands fa-linkedin-in text-white hover:scale-150 cursor-pointer"></i
        ></a>
      </div>
    </footer>
  </div>
</template>
