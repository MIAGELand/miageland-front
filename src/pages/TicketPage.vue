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
                    <data-table :data="ticketList"
                                :rows="rows"
                                :action-list="actionList"
                                :entity="route"
                                @refresh="refresh"
                    ></data-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../layouts/VerticalNavbar.vue";
import {ticketKeys, useTicketList} from "../queries/ticket.query";
import DataTable from "../components/DataTable.vue";
import {useQueryClient} from "@tanstack/vue-query";
const title = "Tickets";
const logoUrl = "src/assets/tickets.svg";
const route = "tickets";
const queryClient = useQueryClient();

const { data: ticketList, isLoading } = useTicketList();
let rows = {
    'id': 'ID_t',
    'idVisitor': 'ID_v',
    'nameVisitor': 'Visiteur',
    'price': 'Prix',
    'state': 'Etat',
    'date': 'Date'
}
let actionList = {
    'validate': {
        'icon': '✅',
        'color': 'bg-green-500 text-white enabled:hover:bg-green-600'
    },
    'cancel': {
        'icon': '❌',
        'color': 'bg-gray-400 text-white enabled:hover:bg-gray-500'
    },
}

const refresh = async () => {
    await queryClient.refetchQueries(ticketKeys.ticketList.queryKey);
};
</script>

<style scoped>
</style>
