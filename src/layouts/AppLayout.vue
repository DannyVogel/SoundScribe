<script setup lang="ts"></script>

<template>
  <div class="w-screen h-screen grid grid-rows-layout">
    <slot name="header" />
    <div class="bg-blue-400 overflow-y-hidden">
      <slot name="main" />
    </div>
    <slot name="footer" />
  </div>
</template>

<style scoped></style>
