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
                    <data-table :data="ticketList" :rows="rows"></data-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../layouts/VerticalNavbar.vue";
import {useTicketList} from "../queries/ticket.query";
import TicketsCard from "../components/TicketsCard.vue";
import DataTable from "../components/DataTable.vue";
const title = "Tickets";
const logoUrl = "src/assets/tickets.svg";

const { data, error, isLoading } = useTicketList();
let ticketList = data;
let rows = ['nbTicket', 'price', 'state', 'date'];
</script>

<style scoped>
</style>
