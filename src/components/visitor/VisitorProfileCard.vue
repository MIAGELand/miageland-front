<script setup lang="ts">
import { Visitor } from "../../models/models";
import { computed, PropType } from "vue";

const props = defineProps({
  visitor: Object as PropType<Visitor>,
});

const name = computed(() => props.visitor.name);
const surname = computed(() => props.visitor.surname);
</script>

<template>
  <div class="shadow-2xl bg-slate-600 rounded-lg py-2 h-fit w-fit">
    <div class="flex flex-col gap-2 px-4">
      <div class="flex text-xl gap-4 justify-between">
        <span>Nom : </span>
        <span class="text-md">{{ surname }}</span>
      </div>
      <div class="flex text-xl gap-4 justify-between">
        <span>Prénom : </span>
        <span>{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
