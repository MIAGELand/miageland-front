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
      :class="{ 'bg-dark text-white': active === 'employees' }"
      @click="$emit('nav', 'employees')"
    >
      Employés
    </button>
    <button
      class="bg-white text-gray-800 w-1/2 p-2 rounded-xl transition-colors ease-in"
      :class="{ 'bg-dark text-white': active === 'attractions' }"
      @click="$emit('nav', 'attractions')"
    >
      Attractions
    </button>
    <button
      class="bg-white text-gray-800 w-1/2 p-2 rounded-xl transition-colors ease-in"
      :class="{ 'bg-dark text-white': active === 'tickets' }"
      @click="$emit('nav', 'tickets')"
    >
      Tickets
    </button>
    <button
      class="bg-white text-gray-800 w-1/2 p-2 rounded-xl transition-colors ease-in"
      :class="{ 'bg-dark text-white': active === 'visitors' }"
      @click="$emit('nav', 'visitors')"
    >
      Visitors
    </button>
  </div>
</template>

<style scoped>
.bg-dark {
  background-color: #1c1c1c;
}
</style>
