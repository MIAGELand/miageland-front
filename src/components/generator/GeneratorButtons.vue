<script setup lang="ts">
import {ref} from "vue";

const emit = defineEmits(["generate-data", "generate-random-data"])

const nbData = ref(0)
const generateData = () => {
  emit("generate-data");
};

const generateRandomData = () => {
  emit("generate-random-data", nbData.value);
};
</script>

<template>
  <button
      @click.prevent="generateData"
      class="bg-blue-500 enabled:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
  >
    Générer
  </button>
  <input
      type="number"
      min="1"
      v-model="nbData"
      class="border border-gray-400 text-gray-800 rounded py-2 px-2 mb-3 ml-4 mr-1 leading-tight w-24 focus:outline-none focus:bg-white focus:border-gray-500"
  />
  <button
      @click.prevent="generateRandomData"
      class="bg-teal-700 enabled:hover:bg-teal-900 text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-50"
      :disabled="nbData === 0"
  >
    Générer random
  </button>
</template>

<style scoped>

</style>