<script setup lang="ts"></script>

<template>
  <div
    class="relative w-screen h-screen max-h-screen grid grid-rows-layout bg-gray-800 max-w-3xl mx-auto overflow-x-hidden"
  >
    <slot name="header" />
    <div class="max-h-full bg-gray-800 overflow-x-hidden">
      <slot name="main" />
    </div>
  </div>
</template>

<style scoped></style>
