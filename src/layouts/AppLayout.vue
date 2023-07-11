<script setup lang="ts"></script>

<template>
  <div class="relative w-screen h-screen max-h-screen grid grid-rows-layout">
    <slot name="header" />
    <div class="max-h-full bg-gray-800 overflow-hidden">
      <slot name="main" />
    </div>
  </div>
</template>

<style scoped></style>
