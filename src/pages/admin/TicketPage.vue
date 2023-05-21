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
                <div class="rounded-lg">
                  <!-- LOADING W/ EMPTY DATATABLE -->
                  <data-table v-if="isLoading"
                              :data="[]"
                              :rows="rows"
                              :action-list="actionList"
                              :entity="route"
                              :current-page="page + 1"
                              :total-data="totalTickets"
                              @refresh="refresh"
                              @update="updateCurrentPage"
                  />
                  <!-- DATATABLE WITH REAL DATA LOADED -->
                  <data-table v-else
                              :data="ticketList"
                              :rows="rows"
                              :action-list="actionList"
                              :entity="route"
                              :total-data="totalTickets"
                              :current-page="page + 1"
                              @refresh="refresh"
                              @update="updateCurrentPage"
                  />
                </div>
              </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../../layouts/VerticalNavbar.vue";
import DataTable from "../../components/datatable/DataTable.vue";
import {useQuery, useQueryClient} from "@tanstack/vue-query";
import {deleteAllTickets, getTicketsByPage} from "../../service/ticket-service";
import {computed, ref} from "vue";
import {ticketKeys, useTicketListByPage, useTicketStats} from "../../queries/ticket.query";

const title = "Tickets";
const logoUrl = "src/assets/tickets.svg";
const route = "tickets";

const queryClient = useQueryClient();
const page = ref(0);
const { isLoading, data: ticketList } = useTicketListByPage(page)
const { data: ticketStats } = useTicketStats();
const totalTickets = computed(() => ticketStats.value?.numberStatsTicket.nbTotal);

let rows = {
    'id': 'ID_t',
    'idVisitor': 'ID_v',
    'nameVisitor': 'Visiteur',
    'price': 'Prix',
    'state': 'Etat',
    'date': 'Date'
}
let actionList = {
    'pay': {
      'icon': '💶',
      'color': 'bg-blue-400 text-white enabled:hover:bg-blue-500'
    },
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

const refresh = async () => {
    await queryClient.refetchQueries({
      ...ticketKeys.ticketListByPage(page),
    });
};
</script>

<style scoped>
</style>
