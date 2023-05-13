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
                <div v-else class="flex gap-4 flex-wrap rounded-xl">
                    <card-container emoji="👨‍🔧" title="Employés" class="flex flex-col gap-2 bg-blue-900">
                        <div class="flex items-baseline gap-2">
                            <NumberElement :data="employeeList" title="total" size="lg"/>
                        </div>
                        <hr>
                        <div class="flex gap-2 items-end">
                            <NumberElement :data="employeeListAdmin" title="Admins" size="md"/>
                            <NumberElement :data="employeeListClassic" title="Classiques" size="md"/>
                        </div>
                    </card-container>
                    <card-container emoji="🎢" title="Attractions" class="flex flex-col gap-2 bg-pink-950">
                        <div class="flex items-baseline gap-2">
                            <NumberElement :data="attractionList" title="total" size="lg"/>
                        </div>
                        <hr>
                        <div class="flex gap-2 items-end">
                            <NumberElement :data="attractionListOpened" title="Ouvertes" size="md"/>
                            <NumberElement :data="attractionListClosed" title="Fermées" size="md"/>
                        </div>
                    </card-container>
                    <card-container emoji="🎟️" title="Billets" class="flex flex-col gap-2">
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

const title = "Dashboard";
const logoUrl = "src/assets/dashboard.svg";

const { data: employeeList, isLoading: employeeLoading } = useEmployeeList();
const { data: attractionList, isLoading: attractionLoading } = useAttractionList();
const { data: ticketList, isLoading: ticketLoading } = useTicketList();

const isLoading = computed(() => {
    return employeeLoading.value || attractionLoading.value || ticketLoading.value;
});

const filter = (table: Ref, column: string, value: string | boolean) => {
    console.log(table.value)
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
</script>

<style scoped>
</style>
