<template>
  <div class="flex">
    <VerticalVisitor />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-bold">
        <img :src="logoUrl" alt="visitor" class="h-8 w-8 mr-4" />
        {{ title }}
      </div>

      <!-- RESERVATIONS -->
      <div class="m-8 flex flex-col gap-4">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import VerticalVisitor from "../../layouts/VerticalVisitor.vue";

const title = "Mes réservations";
const logoUrl = "src/assets/tickets.svg";
</script>

<style scoped>
</style>
