<script setup lang="ts">
defineEmits(["nav"]);
defineProps({
  active: String,
});
</script>

<template>
  <div class="border-gray-400 bg-white flex rounded-xl p-0.5">
    <button
      class="bg-white w-1/2 text-gray-800 p-2 rounded-xl transition-colors ease-in"
      :class="{ 'bg-dark text-white': active === 'global' }"
      @click="$emit('nav', 'global')"
    >
      Global
    </button>
    <button
      class="bg-white text-gray-800 w-1/2 p-2 rounded-xl transition-colors ease-in"
      :class="{ 'bg-dark text-white': active === 'graph' }"
      @click="$emit('nav', 'graph')"
    >
      Graph
    </button>
    <button
      class="bg-white text-gray-800 w-1/2 p-2 rounded-xl transition-colors ease-in"
      :class="{ 'bg-dark text-white': active === 'timeline' }"
      @click="$emit('nav', 'timeline')"
    >
      Timeline
    </button>
  </div>
</template>

<style scoped>
.bg-dark {
  background-color: #1c1c1c;
}
</style>
