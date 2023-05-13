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
            <div class="m-8 flex">
                <span v-if="isLoading">
                    Loading...
                </span>
                <div v-else class="flex flex-col gap-4 w-full">
                    <div class="flex flex-wrap gap-4">
                        <card-container emoji="👨‍🔧" title="Employés" class="flex flex-col gap-2 grow">
                            <div class="flex items-baseline gap-2">
                                <NumberElement :data="employeeList" title="total" size="lg"/>
                            </div>
                            <hr>
                            <div class="flex gap-2 items-end">
                                <NumberElement :data="employeeListAdmin" title="Admins" size="md"/>
                                <NumberElement :data="employeeListClassic" title="Classiques" size="md"/>
                            </div>
                        </card-container>
                        <card-container emoji="🎢" title="Attractions" class="flex flex-col gap-2 grow">
                            <div class="flex items-baseline gap-2">
                                <NumberElement :data="attractionList" title="total" size="lg"/>
                            </div>
                            <hr>
                            <div class="flex gap-2 items-end">
                                <NumberElement :data="attractionListOpened" title="Ouvertes" size="md"/>
                                <NumberElement :data="attractionListClosed" title="Fermées" size="md"/>
                            </div>
                        </card-container>
                        <card-container emoji="🎟️" title="Billets" class="flex flex-col gap-2 grow">
                            <div class="flex items-baseline gap-2">
                                <NumberElement :data="ticketList" title="total" size="lg"/>
                            </div>
                            <hr>
                            <div class="flex gap-2 items-end">
                                <NumberElement :data="ticketListPaid" title="Payés" size="md"/>
                                <NumberElement :data="ticketListUsed" title="Utilisés" size="md"/>
                                <NumberElement :data="ticketListCancelled" title="Annulés" size="md"/>
                            </div>
                        </card-container>
                    </div>

                    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3">
                        <card-container emoji="📊" title="Répartition des employés" class="flex flex-col gap-2">
                            <PieChart :data="employeeNumberList" :labels="employeeNameList"/>
                        </card-container>
                        <card-container emoji="📊" title="Répartition des attractions" class="flex flex-col gap-2">
                            <PieChart :data="attractionNumberList" :labels="attractionNameList"/>
                        </card-container>
                        <card-container emoji="📊" title="Répartition des billets" class="flex flex-col gap-2">
                            <PieChart :data="ticketNumberList" :labels="ticketNameList"/>
                        </card-container>
                    </div>

                    <div class="flex flex-wrap gap-4 w-full">
                        <card-container emoji="📊" title="Nb tickets / mois" class="flex flex-col gap-2 w-full">
                            <LineChart :data="ticketNumberByMonthAndYear" :labels="ticketDateLabels" lineLabel="Nb tickets / mois"/>
                        </card-container>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../layouts/VerticalNavbar.vue";
import {useEmployeeList} from "../queries/employee.query";
import CardContainer from "../components/dashboard/CardContainer.vue";
import {useAttractionList} from "../queries/attraction.query";
import {computed, Ref} from "vue";
import {useTicketList} from "../queries/ticket.query";
import NumberElement from "../components/dashboard/NumberElement.vue";
import PieChart from "../components/dashboard/PieChart.vue";
import LineChart from "../components/dashboard/LineChart.vue";
import {getChartLabels} from "../util/date";

const title = "Dashboard";
const logoUrl = "src/assets/dashboard.svg";

const { data: employeeList, isLoading: employeeLoading } = useEmployeeList();
const { data: attractionList, isLoading: attractionLoading } = useAttractionList();
const { data: ticketList, isLoading: ticketLoading } = useTicketList();

const isLoading = computed(() => {
    return employeeLoading.value || attractionLoading.value || ticketLoading.value;
});

const filter = (table: Ref, column: string, value: string | boolean) => {
    return table.value?.filter((item: any) => item[column] === value);
}

// when loaded, filter the data to get the number of employees, attractions and tickets
const employeeListAdmin = computed(() => {
    return filter(employeeList, 'role', 'ADMIN');
});

const employeeListClassic = computed(() => {
    return filter(employeeList, 'role', 'CLASSIC');
});

const attractionListOpened = computed(() => {
    return filter(attractionList, 'opened', true);
});

const attractionListClosed = computed(() => {
    return filter(attractionList, 'opened', false);
});

const ticketListPaid = computed(() => {
    return filter(ticketList, 'state', 'PAID');
});

const ticketListUsed = computed(() => {
    return filter(ticketList, 'state', 'USED');
});

const ticketListCancelled = computed(() => {
    return filter(ticketList, 'state', 'CANCELLED');
});

const employeeNumberList = computed(() => {
    return [employeeListAdmin.value.length, employeeListClassic.value.length];
});

const employeeNameList = computed(() => {
    return ['Admins', 'Classiques'];
});

const attractionNumberList = computed(() => {
    return [attractionListOpened.value.length, attractionListClosed.value.length];
});

const attractionNameList = computed(() => {
    return ['Ouvertes', 'Fermées'];
});

const ticketNumberList = computed(() => {
    return [ticketListPaid.value.length, ticketListUsed.value.length, ticketListCancelled.value.length];
});

const ticketNameList = computed(() => {
    return ['Payés', 'Utilisés', 'Annulés'];
});

const firstTicketDate = computed(() => {
    const dates = ticketList.value.map((ticket: any) => new Date(ticket.date));
    return new Date(Math.min.apply(null, dates));
});

const lastTicketDate = computed(() => {
    const dates = ticketList.value.map((ticket: any) => new Date(ticket.date));
    return new Date(Math.max.apply(null, dates));
});

const ticketDateLabels = computed(() => {
    return getChartLabels(firstTicketDate.value, lastTicketDate.value);
});

const ticketNumberByMonthAndYear = computed(() => {
    const ticketNumberByMonthAndYear = [];
    for (let i = 0; i < ticketDateLabels.value.length; i++) {
        ticketNumberByMonthAndYear.push(0);
    }
    ticketList.value.forEach((ticket: any) => {
        const ticketDate = new Date(ticket.date);
        const month = ticketDate.getMonth() + 1;
        const ticketMonth = month < 10 ? `0${month}` : month;
        const ticketYear = ticketDate.getFullYear().toString().substring(2);
        const ticketIndex = ticketDateLabels.value.findIndex((label: string) => label === `${ticketMonth}/${ticketYear}`);
        ticketNumberByMonthAndYear[ticketIndex]++;
    });
    return ticketNumberByMonthAndYear;
});
</script>

<style scoped>
</style>
