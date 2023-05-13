<script setup lang="ts">
defineProps({
    title: String,
    emoji: String
});
</script>

<template>
  <div class="border-2 border-white bg-gray-700 rounded px-4 py-2 w-fit h-fit">
      <div class="flex gap-4 items-center">
          <span class="text-3xl">{{emoji}}</span>
          <span class="text-xl font-bold">{{title}}</span>
      </div>
      <hr>
      <slot></slot>
  </div>
</template>

<style scoped>

</style>