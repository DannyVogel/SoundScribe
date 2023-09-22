<script setup lang="ts">
import { ref, watch, PropType } from 'vue'
import { getTimeAgo } from '@/utils'
import { Note, Comment } from '@/types'
import { useToast, TYPE } from 'vue-toastification'
import useAuthStore from '@/stores/authStore'
import useNotesStore from '@/stores/notesStore'

defineEmits(['close'])
const props = defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true
  }
})

const authStore = useAuthStore()
const notesStore = useNotesStore()
const toast = useToast()

const comment = ref('')

const addComment = () => {
  if (comment.value == '') {
    toast(`You can't post an empty comment!`, {
      type: TYPE.WARNING
    })
    return
  }
  notesStore.addComment(props.note.id, {
    author: authStore.userName,
    comment: comment.value,
    postedAt: new Date()
  })
  toast(`Comment posted!`, {
    type: TYPE.SUCCESS
  })
  comment.value = ''
}

// TODO: have time update in real time
</script>
<template>
  <div class="absolute w-full bg-gray-300 flex flex-col pb-1 rounded bottom-12">
    <div class="w-full max-h-80 overflow-y-scroll flex flex-col">
      <template v-for="(comment, index) in note.comments">
        <div
          class="w-fit rounded m-1"
          :class="index % 2 === 0 ? 'bg-orange-300 self-end' : 'bg-orange-400 '"
        >
          <p class="px-2 py-1 border-b border-gray-500">{{ comment.comment }}</p>
          <div class="flex items-center px-2 gap-1">
            <p class="w-fit text-sm">
              {{ comment.author }}
            </p>
            <img
              v-if="comment.author === note.author"
              class="w-4 h-4"
              src="../assets/icons/scribe2.png"
              alt="scribe icon; image of a music note on a sheet with a pencil"
            />
            <span class="text-xs text-gray-500">{{ getTimeAgo(comment.postedAt) }}</span>
          </div>
        </div>
      </template>
    </div>
    <form @submit.prevent="addComment" class="w-full flex justify-center">
      <input
        v-model="comment"
        type="text"
        class="w-11/12 rounded px-2 border border-orange-500"
        :class="note.comments.length > 0 ? '' : 'mt-1'"
        placeholder="Leave a comment..."
      />
    </form>
  </div>
</template>
