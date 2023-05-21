<script setup lang="ts">
defineEmits(['nav']);
defineProps({
    active: String
});
</script>

<template>
  <div class="border-gray-400 bg-white w-64 rounded-xl p-0.5">
    <button class="bg-white w-1/2 text-gray-800 p-2 rounded-xl transition-colors ease-in" :class="{'bg-gray-600 text-white' : active === 'visiteur'}" @click="$emit('nav', 'visiteur')">
      Visiteur
    </button>
    <button class="bg-white text-gray-800 w-1/2 p-2 rounded-xl transition-colors ease-in" :class="{'bg-gray-600 text-white' : active === 'admin'}" @click="$emit('nav', 'admin')">
      Admin
    </button>
  </div>
</template>

<style scoped>

</style>