<template>
    <div class="flex flex-col">
        <div class="flex justify-between items-center mb-4">
            <div>
                <input type="text" class="py-2 pl-3 pr-10 leading-tight bg-white border border-gray-400 text-gray-800 rounded-xl appearance-none focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Search..." v-model="searchText">
            </div>
            <div class="justify-end">
                <!-- Previous button -->
                <button
                        @click="currentPage = currentPage - 1"
                        :disabled="currentPage === 1"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-white text-gray-800 text-sm font-medium rounded w-10 h-10"
                >
                    ⬅️
                </button>

                <button
                        :key="1"
                        @click="currentPage = 1"
                        :class="{
                          'bg-gray-800': 1 === currentPage,
                          'bg-white text-gray-500': 1 !== currentPage
                        }"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-white text-sm font-medium rounded w-10 h-10"
                >
                    1
                </button>
                <button
                        v-if="currentPage !== 1 && currentPage !== totalPages"
                        :key="currentPage"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-gray-800 text-white text-sm font-medium rounded w-10 h-10"
                >
                    {{ currentPage }}
                </button>
                <button
                        v-else
                        :key="currentPage"
                        @click="currentPage = Math.ceil(totalPages / 2)"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-white text-gray-800 text-sm font-medium rounded w-10 h-10"
                >
                    ...
                </button>
                <button
                        :key="totalPages"
                        @click="currentPage = totalPages"
                        :class="{
                          'bg-gray-800': totalPages === currentPage,
                          'bg-white text-gray-500': totalPages !== currentPage
                        }"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-white text-sm font-medium rounded w-10 h-10"
                >
                    {{ totalPages }}
                </button>
                <!-- Next button -->
                <button
                        @click="currentPage = currentPage + 1"
                        :disabled="currentPage === totalPages"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-white text-sm font-medium rounded w-10 h-10"
                >
                    ➡️
                </button>
            </div>

        </div>
        <div class="-my-2 overflow-x-auto">
            <div class="py-2 align-middle inline-block min-w-full">
                <div class="overflow-hidden border-b border-gray-200 rounded-xl">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th v-for="row in props.rows" scope="col" class="px-6 py-3 text-left text-gray-500 uppercase tracking-wider cursor-pointer">
                                {{ row }}
                            </th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="d in filteredData" :key="d.id">
                            <td v-for="col in rows" class="px-6 py-4 whitespace-nowrap text-gray-900">{{ d[col] }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-xl">
                <div>
                    <span class="text-sm font-medium text-gray-700 rounded-xl">{{ paginationInfo }}</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps ({
    data: {
        type: Array,
        required: true
    },
    rows: {
        type: Array,
        required: true
    }
});

const currentPage = ref(1);
const itemsPerPage = 10;
const searchText = ref('');

// Compute total number of pages
const totalPages = computed(() => {
    return Math.ceil(props.data.length / itemsPerPage)
});

// Compute filtered data based on search text and current page
const filteredData = computed(() => {
    let data = props.data;
    if (searchText.value) {
        data = data.filter((item) => {
            return Object.values(item).some((value) => {
                return value.toString().toLowerCase().includes(searchText.value.toLowerCase());
            });
        });
    }
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
});

const rows = props.rows;

// Compute pagination info
const paginationInfo = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage + 1;
    const endIndex = startIndex + filteredData.value.length - 1;
    return `Affichage de ${startIndex} à ${endIndex} sur ${props.data.length} lignes`;
});

// Compute pages
const pages = computed(() => {
    const pages = [];
    for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i);
    }
    return pages;
});

// Watch for changes in current page
watch(currentPage, (newPage) => {
    if (newPage < 1) {
        currentPage.value = 1;
    }
    if (newPage > totalPages.value) {
        currentPage.value = totalPages.value;
    }
});

// Watch for changes in search text
watch(searchText, () => {
    currentPage.value = 1;
});
</script>