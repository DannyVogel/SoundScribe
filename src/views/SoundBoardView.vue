<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const posts = [
  {
    title: 'Sounds to Reminisce',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nibh nec neque tempus, vulputate cursus justo ornare. Donec efficitur aliquet imperdiet. Aenean molestie ex pellentesque augue efficitur sollicitudin. Aliquam pellentesque purus nunc, at consequat urna pharetra eu. Duis pellentesque, magna a consectetur scelerisque, dolor lectus hendrerit erat, bibendum accumsan metus massa ut nulla. Vivamus faucibus eu arcu fringilla egestas. Sed dolor magna, semper blandit dui ut, porta volutpat est.',
    songURL: 'https://www.youtube.com/watch?v=jfKfPfyJRdk'
  }
  // {
  //   title: '2',
  //   content: 'asdas',
  //   songURL: 'adsdas'
  // },
  // {
  //   title: '3',
  //   content: 'asdas',
  //   songURL: 'adsdas'
  // }
]
</script>
<template>
  <div class="p-3 flex flex-col items-center gap-4">
    <h1>{{ authStore.userName }}'s SoundBoard</h1>
    <div
      v-for="post in posts"
      class="w-full h-screen p-3 border border-red-700 flex flex-col items-center min-h-full"
    >
      <h1 class="font-title text-white text-2xl">{{ post.title }}</h1>
      <iframe
        class="w-full mt-4"
        src="https://www.youtube.com/embed/jfKfPfyJRdk"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>
