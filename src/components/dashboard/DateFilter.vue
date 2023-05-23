<script setup lang="ts">
import {ref, watch} from 'vue';
import { DatePicker } from 'v-calendar'
import moment from "moment";
const range = ref({
  start: new Date(),
  end: new Date(),
});

const emit = defineEmits(['updateRange']);
// Emit changes when range is changed
watch(range, () => {
  emit('updateRange', range.value)
});

</script>

<template>
  <DatePicker v-model.range="range" >
    <template #default="{ togglePopover }" class="flex flex-col gap-2">
      <button
          class="px-3 py-2 bg-white text-sm text-black rounded-md hover:bg-teal-800 hover:text-white transition-all"
          @click="togglePopover"
      >
        Select date
      </button>
    </template>
  </DatePicker>
</template>

<style scoped>

</style>