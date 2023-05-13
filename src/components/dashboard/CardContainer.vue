<script setup lang="ts">
defineProps({
    title: String,
    emoji: String
});
</script>

<template>
  <div class="border-2 border-white bg-gray-700 rounded py-2 h-fit">
      <div class="flex gap-4 items-center px-4">
          <span class="text-3xl">{{emoji}}</span>
          <span class="text-xl font-bold">{{title}}</span>
      </div>
      <div class="border border-white w-full"></div>
      <div class="flex flex-col px-4 gap-2">
          <slot></slot>
      </div>
  </div>
</template>

<style scoped>

</style>