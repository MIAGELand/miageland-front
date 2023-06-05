<template>
  <div
    class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
    :class="{ 'bg-gray-700 font-semibold': isActive }"
    @click="$router.push({ name: routeName })"
  >
    <img :src="iconUrl" :alt="label" class="h-8 w-8 mr-4" />
    <button>{{ label }}</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  label: String,
  iconUrl: String,
  routeName: String,
  isActive: Boolean,
});
</script>

<style scoped>
button {
  color: white;
}
</style>
