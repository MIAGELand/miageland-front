<template>
  <Toaster />
  <div class="flex">
    <VerticalVisitor />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-bold">
        <img :src="logoUrl" alt="attractions" class="h-8 w-8 mr-4" />
        {{ title }}
      </div>

      <!-- ATTRACTIONS -->
      <div class="m-8 flex flex-col gap-4">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalVisitor from "../../layouts/VerticalVisitor.vue";
import {useVisitor} from "../../queries/visitor.query";
import {getCookie} from "../../util/cookie";
import {computed} from "vue";
import VisitorProfileCard from "../../components/visitor/VisitorProfileCard.vue";
import {deleteVisitor} from "../../service/visitor-service";
import { useRouter} from "vue-router";
import {toast, Toaster} from "vue-sonner";
const title = "Attractions";
const logoUrl = "src/assets/attractions.svg";
</script>

<style scoped>
</style>
