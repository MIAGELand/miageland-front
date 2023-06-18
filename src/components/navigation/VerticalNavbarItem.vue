<template>
  <div
    class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
    :class="{ 'bg-gray-700 font-semibold': isActive }"
    @click="$router.push({ name: routeName })"
  >
    <slot></slot>
    <button>{{ label }}</button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String,
  routeName: String,
  isActive: Boolean,
});
</script>

<style scoped>
button {
  color: white;
}
</style>
