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
                                :total-data="totalTickets"
                                @refresh="refresh"
                                @update="updateCurrentPage"
                    ></data-table>
                  <button class="font-bold py-2 px-4 bg-red-700 rounded mx-0.5 disabled:opacity-30 transition"
                  @click="deleteAll">
                    Delete all
                  </button>
                </div>
              </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../layouts/VerticalNavbar.vue";
import {ticketKeys} from "../queries/ticket.query";
import DataTable from "../components/datatable/DataTable.vue";
import {useQuery, useQueryClient} from "@tanstack/vue-query";
import {deleteAllTickets, getTicketsByPage} from "../service/ticket-service";
import {computed, ref} from "vue";
import {useTicketStats} from "../queries/ticket.query";

const title = "Tickets";
const logoUrl = "src/assets/tickets.svg";
const route = "tickets";

const queryClient = useQueryClient();
const page = ref(0);
const { isLoading, data: ticketList } = useQuery({
    queryKey: ['Tickets', 'ticketsListByPage', page],
    queryFn: () => getTicketsByPage(page),
    keepPreviousData: true,
})

const { data: ticketStats } = useTicketStats();

const totalTickets = computed(() => {
    return ticketStats?.value.numberStatsTicket.nbTotal;
})

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
        'color': 'bg-green-300 text-white enabled:hover:bg-green-400'
    },
    'cancel': {
        'icon': '❌',
        'color': 'bg-gray-300 text-white enabled:hover:bg-gray-400'
    },
}

const updateCurrentPage = (newPage: number) => {
    page.value = newPage - 1;
}
const deleteAll = async () => {
  await deleteAllTickets();
  await refresh()
}

const refresh = async () => {
    await queryClient.refetchQueries(ticketKeys.ticketList.queryKey);
};
</script>

<style scoped>
</style>
