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
          class="px-2 py-2 text-sm text-white rounded-md bg-gray-700 hover:bg-gray-800 hover:text-white transition-all"
          @click="togglePopover"
      >
        Select date
      </button>
    </template>
  </DatePicker>
</template>

<style scoped>

</style>