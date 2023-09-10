<script setup lang="ts">
import { ShareIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'

defineEmits(['newer', 'older'])
defineProps({
  isNewestNote: {
    type: Boolean,
    required: true
  },
  isOldestNote: {
    type: Boolean,
    required: true
  }
})
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
      <p class="text-xl cursor-pointer">🎶</p>
      <ChatBubbleLeftRightIcon class="w-6 cursor-pointer" />
      <ShareIcon class="w-6 cursor-pointer" />
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
