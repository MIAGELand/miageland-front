<script setup lang="ts">
import { computed, PropType } from "vue";
import { size } from "../../models/models";

const props = defineProps({
  data: Number,
  title: String,
  size: String as PropType<size>,
});

const size = computed(() => {
  if (props.size === "sm") {
    return "text-sm";
  } else if (props.size === "md") {
    return "text-md";
  } else if (props.size === "lg") {
    return "text-xl";
  }
});
</script>

<template>
  <div :class="size">
    {{ title }} :
    {{ data }}
  </div>
</template>

<style scoped></style>
