<script setup>
// import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const posts = [
  {
    title: 'Sounds to Reminisce',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nibh nec neque tempus, vulputate c, semper blandit dui ut, porta volutpat est.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nibh nec neque tempus, vulputate cursus justo ornare. Donec efficitur aliquet imperdiet. Aenean molestie ex pellentesque augue efficitur sollicitudin. Aliquam pellentesque purna pharetra eu. Duis pellentesque, magna a consectetur scelerisque, dolor lectus hendrerit erat, bibendum accumsan metus massa ut nulla. Vivamus faucibus eu arcu fringilla egestas. Sed dolor magna, semper blandit dui ut, porta volutpat estLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nibh nec neque tempus, vulputate cursus justo ornare. Donec efficitur aliquet imperdiet. Aenean molestie ex pellentesque augue efficitur sollicitudin. landit dui ut, porta volutpat estLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nibh nec neque tempus, vulputate cursus justo ornare. Donec efficitur aliquet imperdiet. Aenean molestie ex pellentesque augue efficitur sollicitudin. Aliquam pellentesque purus nunc, at consequat urna pharetra eu. Duis pellentesque, magna a consectetur scelerisque, dolor lectus hendrerit erat, bibendum accumsan metus massa ut nulla. Vivamus faucibus eu arcu fringilla egestas. Sed dolor magna, semper blandit dui ut, porta volutpat est.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nibh nec neque tempus, vulputate cursus justo ornare. Donec efficitur aliquet imperdiet. Aenean molestie ex pellentesque augue efficitur sollicitudin. Aliquam pellentesque purus nunc, at consequat urna pharetra eu. Duis pellentesque, magna a consectetur scelerisque, dolor lectus hendrerit erat, bibendum accumsan metus massa ut nulla. Vivamus faucibus eu arcu fringilla egestas. Sed dolor magna, semper blandit dui ut, pobendum accumsan metus massa ut nulla. Vivamus faucibus eu arcu fringilla egestas. Sed dolor magna, semper blandit dui ut, porta volutpat est.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nibh nec neque tempus, vulputate cursus justo ornare. Donec efficitur aliquet imperdiet. Aenean molestie ex pellentesque augue efficitur sollicitudin. Aliquam pellentesque purus nunc, at consequat urna pharetra eu. Duis pellentesque, magna a consectetur scelerisque, dolor lectus hendrerit erat, bibendum accumsan metus massa ut nulla. Vivamus faucibus eu arcu fringilla egestas. Sed dolor magna, semper blandit dui ut, porta volutpat est.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nibh nec neque tempus, vulputate cursus justo ornare. Donec efficitur aliquet imperdiet. Aenean molestie ex pellentesque augue efficitur sollicitudin. Aliquam pellentesque purus nunc, at consequat urna pharetra eu. Duis pellentesque, magna a consectetur scelerisque, dolor lectus hendrerit erat, bibendum accumsan metus massa ut nulla. Vivamus faucibus eu arcu fringilla egestas. Sed dolor magna, semper blandit dui ut, porta volutpat est.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nibh nec neque tempus, vulputate cursus justo ornare. Donec efficitur aliquet imperdiet. Aenean molestie ex pellentesque augue efficitur sollicitudin. Aliquam pellentesque purus nunc, at consequat urna pex pellentesque augue efficitur sollicitudin. Aliquam pellentesque purus nunc, at consequat urna pharetra eu. Duis pellentesque, magna a consectetur scelerisque, dolor lectus hendrerit erat, bibendum accumsan metus massa ut nulla. Vivamus faucibus eu arcu fringilla egestas. Sed dolor magna, semper blandit dui ut, porta volutpat est.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nibh nec neque tempus, vulputate cursus justo ornare. Donec efficitur aliquet imperdiet. Aenean molestie ex pellentesque augue efficitur sollicitudin. Aliquam pellentesque purus nunc, at consequat urna pharetra eu. Duis pellentesque, magna a consectetur scelerisque, dolor lectus hendrerit erat, bibendum accumsan metus massa ut nulla. Vivamus faucibus eu arcu fringilla egestas. Sed dolor magna, semper blandit dui ut, porta volutpat est.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla nibh nec neque tempus, vulputate cursus justo ornare. Donec efficitur aliquet imperdiet. Aenean molestie ex pellentesque augue efficitur Vivamus faucibus eu arcu fringilla egestas. Sed dolor magna, semper blandit dui ut, porta volutpat est.',
    songURL: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    dateComposed: 'July 11 2023'
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
  <div class="max-h-full h-full text-white">
    <div
      v-for="(post, idx) in posts"
      class="w-full max-h-full h-full grid grid-rows-soundBoard gap-3 mt-2"
      :key="idx"
    >
      <iframe
        class="w-full h-full"
        src="https://www.youtube.com/embed/jfKfPfyJRdk"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <div class="px-3">
        <h1 class="font-title text-white text-2xl">{{ post.title }}</h1>
        <p class="text-sm text-gray-400">{{ post.dateComposed }} - {{ authStore.userName }}</p>
      </div>
      <p class="px-3 pb-24 overflow-y-scroll">
        {{ post.content }}
      </p>
    </div>
  </div>
  <div
    class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-gray-800"
  ></div>
  <div
    class="absolute bottom-6 left-1/2 -ml-[37.5%] w-3/4 h-12 bg-white rounded-full flex justify-around items-center"
  >
    <div class="flex items-center gap-2 cursor-pointer">
      <i class="fa-solid fa-angles-left"></i>
      <p>Newer</p>
    </div>
    <p class="w-6 cursor-pointer">🎶</p>
    <i class="w-6 text-center fa-regular fa-comments cursor-pointer"></i>
    <i class="w-6 text-center fa-regular fa-share-from-square cursor-pointer"></i>
    <div class="flex items-center gap-2 cursor-pointer">
      <p>Older</p>
      <i class="fa-solid fa-angles-right"></i>
    </div>
  </div>
</template>
