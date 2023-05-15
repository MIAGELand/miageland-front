<template>
    <div class="flex">
        <vertical-navbar :title="title" :logoUrl="logoUrl"/>
        <div class="flex flex-col h-screen w-screen md:overflow-auto">
            <!-- TITLE -->
            <div class="flex ml-8 mt-8 text-3xl font-bold">
                <img :src="logoUrl" alt="locker" class="h-8 w-8 mr-4" />
                {{ title }}
            </div>

            <!-- EMPLOYEES -->
            <div class="m-8">
                <span v-if="isLoading">Loading...</span>
                <div v-else class="rounded-lg">
                    <data-table :data="attractionList" :rows="rows" :action-list="actionList" :entity="route" @refresh="refresh"></data-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../layouts/VerticalNavbar.vue";
import DataTable from "../components/datatable/DataTable.vue";
import {useQueryClient} from "@tanstack/vue-query";
import {attractionsKeys, useAttractionList} from "../queries/attraction.query";

const title = "Attractions";
const logoUrl = "src/assets/attractions.svg";
const route = "attractions";
const queryClient = useQueryClient();
const { data: attractionList, error, isLoading } = useAttractionList();
let rows = {
    'id': 'ID',
    'name': 'Nom',
    'opened': 'Ouverte',
}
let actionList = {
    'open': {
        'icon': '🔓',
        'color': 'bg-green-300 text-white enabled:hover:bg-green-400'
    },
    'close': {
        'icon': '🔒',
        'color': 'bg-orange-300 text-white enabled:hover:bg-orange-400'
    },
    'removeAttraction': {
        'icon': '❌',
        'color': 'bg-gray-300 text-white enabled:hover:bg-gray-400'
    },
}

const refresh = async () => {
    await queryClient.refetchQueries(attractionsKeys.attractionList);
};
</script>

<style scoped>
</style>

