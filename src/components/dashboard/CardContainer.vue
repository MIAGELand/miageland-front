<script setup lang="ts">
defineProps({
  title: String,
  emoji: String,
});
</script>

<template>
  <div class="shadow-2xl bg-slate-600 rounded-lg py-2 h-fit">
    <div class="flex items-center justify-between px-4">
      <div class="flex gap-4 items-center">
        <span class="text-3xl">{{ emoji }}</span>
        <span class="text-xl">{{ title }}</span>
      </div>
    </div>
    <div class="border border-white"></div>
    <div class="flex flex-col px-4 gap-2">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
