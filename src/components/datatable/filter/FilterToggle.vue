<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["filteredSearch", "resetFilters"]);

// Create a copy of the filters object and add a value property to each field
const filtersData = computed(() => {
  return Object.entries(props.filters).map(([key, value]) => {
    if (value.type.includes("|")) {
      const options = value.type.split("|");
      return {
        key: key,
        ...(value as { [key: string]: string }),
        options: options.map((option) => ({ label: option, checked: true })),
      };
    } else {
      return {
        key: key,
        ...(value as { [key: string]: string }),
        value: "",
      };
    }
  });
});

const open = ref(false);
const toggle = () => {
  open.value = !open.value;
};
</script>

<template>
  <div class="rounded-md flex flex-col gap-0">
    <div>
      <button
        type="button"
        :class="{ 'rounded-b-none': open, 'rounded-md': !open }"
        class="inline-flex justify-center border rounded-md border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-900 hover:bg-gray-50 transition-all ease-in-out"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        @click="toggle"
      >
        Filtres
        <!-- Heroicon name: chevron-down -->
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          v-if="!open"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        <!-- Heroicon name: chevron-up -->
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          v-else
        >
          <path
            fill-rule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 11-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- FILTERS -->
    <div
      v-if="open"
      class="flex gap-2 bg-white text-gray-900 rounded-t-none rounded-xl p-4 pb-2"
    >
      <div class="flex flex-col gap-2">
        <div v-for="filter in filtersData">
          <div class="flex gap-2 text-gray-700 justify-between font-semibold">
            <label :for="filter.label" class="text-gray-700 w-1/4">{{
              filter.label
            }}</label>
            <input
              v-if="!filter.type.includes('|')"
              :id="filter.label"
              :type="filter.type"
              v-model="filter.value"
              :placeholder="filter.label"
              class="w-3/4 text-gray-700 px-2 border-gray-400 border bg-gray-100 rounded-md font-regular"
            />
            <div v-else class="flex flex-col gap-2">
              <div
                v-for="option in filter.options"
                class="flex justify-between gap-2"
              >
                <label :for="option.label" class="text-gray-700 font-regular">{{
                  option.label
                }}</label>
                <input
                  type="checkbox"
                  class="w-5 h-5"
                  :value="option.label"
                  v-model="option.checked"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          class="bg-zinc-700 rounded text-white h-full p-2 enabled:hover:bg-zinc-800 disabled:opacity-50"
          @click="$emit('filteredSearch', filtersData)"
          :disabled="loading"
        >
          Lancer
        </button>
        <button
          class="bg-red-800 rounded text-white h-full p-2 enabled:hover:bg-red-900 disabled:opacity-50"
          @click="$emit('resetFilters')"
          :disabled="loading"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
