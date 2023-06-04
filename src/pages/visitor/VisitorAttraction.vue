<template>
  <div class="flex">
    <VerticalVisitor />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-bold">
        <img
          src="../../assets/attractions.svg"
          alt="attractions"
          class="h-8 w-8 mr-4"
        />
        {{ title }}
      </div>

      <!-- ATTRACTIONS -->
      <div class="m-8 flex flex-col gap-4">
        <div v-if="!isLoading" class="flex flex-col gap-2">
          <div
            class="flex flex-col gap-2 justify-between items-start lg:flex-row lg:items-center"
          >
            <div class="text-xl flex items-center gap-2">
              <span class="text-3xl">{{ nbAttractionOpened }}</span>
              <span>attractions ouvertes sur</span>
              <span class="text-3xl">{{ nbAttraction }}</span>
            </div>
            <div class="flex gap-2">
              <div
                class="w-12 h-6 rounded-full p-1 cursor-pointer flex bg-gray-300 transition duration-200 ease-in-out"
                :class="{ 'bg-green-600 justify-end': showOnlyOpened }"
                @click="update"
              >
                <input
                  type="checkbox"
                  name="opened"
                  id="toggle"
                  class="w-full hidden"
                  v-model="showOnlyOpened"
                />
                <div
                  class="w-4 h-full bg-white rounded-full"
                  :class="{ 'justify-end': showOnlyOpened }"
                ></div>
              </div>
              <div>Voir seulement les attractions ouvertes</div>
            </div>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            <visitor-attraction-card
              v-for="attraction in attractionList"
              :attraction="attraction"
              :key="attraction.id"
              :class="showOnlyOpened && !attraction.opened ? 'hidden' : ''"
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
import { computed, ref } from "vue";

const title = "Attractions";
const logoUrl = "../../assets/attractions.svg";

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

const showOnlyOpened = ref(false);

const update = () => {
  showOnlyOpened.value = !showOnlyOpened.value;
  console.log(showOnlyOpened.value);
};
</script>

<style scoped></style>
