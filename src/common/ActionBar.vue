<script setup lang="ts">
import { ref } from 'vue'
import { ShareIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'
import { PropType } from 'vue'
import { Note } from '@/types'

defineEmits(['newer', 'older'])
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

const copyToClipboard = () => {
  isCopied.value = true
  const url = window.location.href.split('/').slice(0, -1).join('/')
  const noteUrl = `${url}/${props.note.id}`
  navigator.clipboard.writeText(noteUrl)
  setTimeout(() => {
    isCopied.value = false
  }, 1500)
}

const likeNote = () => {
  isLiked.value = true
  setTimeout(() => {
    isLiked.value = false
  }, 1500)
}
</script>
<template>
  <div
    class="absolute bottom-6 left-1/2 -ml-[37.5%] md:ml-0 md:-translate-x-1/2 w-3/4 md:max-w-lg h-12 px-4 bg-white rounded-full grid grid-cols-actionBar md:grid-cols-actionBarMD"
  >
    <div>
      <div
        v-if="!isNewestNote"
        @click="$emit('newer')"
        class="h-full flex justify-start items-center gap-1 cursor-pointer"
      >
        <i class="fa-solid fa-angles-left"></i>
        <p>Newer</p>
      </div>
    </div>
    <div class="flex justify-center items-center gap-2 md:gap-6">
      <p
        @click="likeNote"
        class="text-xl cursor-pointer"
        :class="isLiked && 'scale-105 animate-bounce'"
      >
        🎶
      </p>
      <ChatBubbleLeftRightIcon class="w-6 cursor-pointer" />
      <ShareIcon
        @click="copyToClipboard"
        class="w-6 cursor-pointer"
        :class="isCopied && 'scale-105 text-green-600 animate-bounce'"
      />
    </div>
    <div>
      <div
        v-if="!isOldestNote"
        @click="$emit('older')"
        class="h-full flex justify-end items-center gap-1 cursor-pointer"
      >
        <p>Older</p>
        <i class="fa-solid fa-angles-right"></i>
      </div>
    </div>
  </div>
</template>
