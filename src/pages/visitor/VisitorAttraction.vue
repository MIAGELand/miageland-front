<template>
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
        <div v-if="!isLoading" class="flex flex-col gap-2">
          <div class="text-xl">
            <span class="text-3xl">{{ nbAttractionOpened }}</span>
            attractions ouvertes sur
            <span class="text-3xl">{{ nbAttraction }}</span>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            <visitor-attraction-card
              v-for="attraction in attractionList"
              :attraction="attraction"
              :key="attraction.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalVisitor from "../../layouts/VerticalVisitor.vue";
import { useAttractionList } from "../../queries/attraction.query";
import VisitorAttractionCard from "../../components/visitor/VisitorAttractionCard.vue";
import { computed } from "vue";

const title = "Attractions";
const logoUrl = "src/assets/attractions.svg";

const { data: attractionList, isLoading } = useAttractionList();

const nbAttraction = computed(() => {
  if (attractionList) {
    return attractionList.value.length;
  }
});

const nbAttractionOpened = computed(() => {
  if (attractionList) {
    return attractionList.value.filter((attraction) => attraction.opened)
      .length;
  }
});
</script>

<style scoped></style>
