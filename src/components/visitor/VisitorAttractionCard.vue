<script setup lang="ts">
import { PropType } from "vue";
import { Attraction } from "../../models/models";
import {emojis} from "../../util/emoji";

const props = defineProps({
  attraction: Object as PropType<Attraction>,
});
// Generate random emoji

const randomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
};
// Generate random color
const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
</script>

<template>
  <div
    class="flex flex-col align-baseline justify-center shadow-2xl bg-slate-600 rounded-lg py-0 h-80"
    :class="{ 'opacity-30': !attraction.opened }"
  >
    <div
      class="h-1/2 rounded-lg flex items-center justify-center"
      :style="{ backgroundColor: randomColor }"
    >
      <span class="text-6xl">{{ randomEmoji() }}</span>
    </div>
    <div
      class="flex flex-col rounded-lg justify-evenly text-gray-800 items-center bg-white gap-2 px-4 h-1/2"
    >
      <span class="text-2xl">{{ attraction.name }}</span>
      <span v-if="attraction.opened"> 🟢 Ouverte </span>
      <span v-else> 🔴 Fermée </span>
    </div>
  </div>
</template>

<style scoped></style>
