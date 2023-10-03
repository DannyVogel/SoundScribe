<script setup lang="ts">
import { ref } from 'vue'
import { ShareIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'
import { PropType } from 'vue'
import { Note } from '@/types'
import { useToast, TYPE } from 'vue-toastification'
import NoteComments from '@/common/NoteComments.vue'
import useAuthStore from '@/stores/authStore'
import useNotesStore from '@/stores/notesStore'

const toast = useToast()

const authStore = useAuthStore()
const notesStore = useNotesStore()

const emit = defineEmits(['newer', 'older'])
const props = defineProps({
  isNewestNote: {
    type: Boolean,
    required: true
  },
  isOldestNote: {
    type: Boolean,
    required: true
  },
  note: {
    type: Object as PropType<Note>,
    required: true
  }
})

const isCopied = ref(false)
const isLiked = ref(false)
const showComments = ref(false)

const copyToClipboard = () => {
  isCopied.value = true
  const url = window.location.href.split('/').slice(0, -1).join('/')
  const noteUrl = `${url}/${props.note.id}`
  navigator.clipboard.writeText(noteUrl)
  toast(`Link copied!`, {
    type: TYPE.SUCCESS
  })
  setTimeout(() => {
    isCopied.value = false
  }, 1500)
}

const likeNote = () => {
  if (!authStore.isLoggedIn) {
    toast(`You must be logged in to give out 🎶!`, {
      type: TYPE.WARNING
    })
    return
  }
  isLiked.value = true
  notesStore.likeNoteById(props.note.id, authStore.userName)
  setTimeout(() => {
    isLiked.value = false
  }, 1500)
}

const newerNote = () => {
  showComments.value = false
  emit('newer')
}
const olderNote = () => {
  showComments.value = false
  emit('older')
}
</script>
<template>
  <div
    class="absolute bottom-6 left-1/2 -ml-[37.5%] md:ml-0 md:-translate-x-1/2 w-3/4 md:max-w-lg h-12 px-4 bg-white rounded-full flex items-center"
  >
    <div class="relative w-full grid grid-cols-actionBar md:grid-cols-actionBarMD">
      <NoteComments :note="note" v-if="showComments" @close="showComments = false" />
      <div>
        <div
          v-if="!isNewestNote"
          @click="newerNote"
          class="h-full flex justify-start items-center gap-1 cursor-pointer"
        >
          <i class="fa-solid fa-angles-left"></i>
          <p>Newer</p>
        </div>
      </div>
      <div class="flex justify-center items-center gap-2 md:gap-6">
        <div @click="likeNote" class="text-xl cursor-pointer">
          <img
            src="@/assets/icons/musical-note.png"
            class="w-6"
            :class="isLiked && 'scale-105 animate-bounce'"
            alt="musical note icon"
          />
        </div>
        <ChatBubbleLeftRightIcon
          @click="showComments = !showComments"
          class="w-6 cursor-pointer text-[#D83131]"
        />
        <ShareIcon
          @click="copyToClipboard"
          class="w-6 cursor-pointer text-[#D83131]"
          :class="isCopied && 'scale-105  animate-bounce'"
        />
      </div>
      <div>
        <div
          v-if="!isOldestNote"
          @click="olderNote"
          class="h-full flex justify-end items-center gap-1 cursor-pointer"
        >
          <p>Older</p>
          <i class="fa-solid fa-angles-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>
