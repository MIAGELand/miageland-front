<template>
    <div class="flex">
        <vertical-navbar :title="title" :logoUrl="logoUrl"/>
        <div class="flex flex-col h-screen w-screen md:overflow-auto">
            <!-- TITLE -->
            <div class="flex ml-8 mt-8 text-3xl font-bold">
                <img :src="logoUrl" alt="park" class="h-8 w-8 mr-4" />
                {{ title }}
            </div>

            <!-- GENERATORS -->
            <div class="m-8">
                <span v-if="isLoading">
                    Loading...
                </span>
                <div v-else class="flex flex-col gap-12 w-full">
                    <div class="flex flex-col gap-4">
                        <div class="text-2xl">
                            ✋ Jauge
                        </div>
                        <div class="w-full">
                            Nb tickets max : {{jauge}}
                            <input class="w-full" type="range" v-model="jauge" :min="nbMaxTicketsSoldByDay" max="1500">
                            <button class="bg-blue-700 enabled:hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-2 disabled:opacity-50">Valider</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../layouts/VerticalNavbar.vue";
import {aggregateData} from "../util/dashboard";
import {computed, ref} from "vue";
import {getAllDays} from "../util/date";
import {useTicketList} from "../queries/ticket.query";

const title = "Parc";
const logoUrl = "src/assets/park.svg";
const jauge = ref(0); // TODO : get from API

const { data: ticketList, isLoading: ticketLoading } = useTicketList();

const isLoading = computed(() => {
    return ticketLoading.value;
});

const lastTicketDate = computed(() => {
    const dates = ticketList.value.map((ticket: any) => new Date(ticket.date));
    return new Date(Math.max.apply(null, dates));
});

const dayDateLabels = computed(() => {
    return getAllDays(Date.now(), lastTicketDate.value);
});

const nbTicketsSoldByDay = computed(() => {
    return aggregateData(dayDateLabels, ticketList.value, "day", (ticket: any) => 1);
});

const nbMaxTicketsSoldByDay = computed(() => {
    const max = Math.max(...nbTicketsSoldByDay.value);
    jauge.value = max;
    return max;
});
</script>
<style scoped>
</style>
