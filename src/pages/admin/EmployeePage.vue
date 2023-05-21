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
            <div class="m-8" v-if="isManager">
                <span v-if="isLoading">Loading...</span>
                <div v-else class="rounded-lg">
                    <data-table :data="employeeList" :rows="rows" :action-list="actionList" :entity="route" @refresh="refresh"></data-table>
                </div>
            </div>
            <unauthorized-info v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../../layouts/VerticalNavbar.vue";
import {employeesKeys, useEmployeeList} from "../../queries/employee.query";
import DataTable from "../../components/datatable/DataTable.vue";
import {useQueryClient} from "@tanstack/vue-query";
import {computed} from "vue";
import {getCookie} from "../../util/cookie";
import UnauthorizedInfo from "../../components/UnauthorizedInfo.vue";

const title = "Employés";
const logoUrl = "src/assets/employees.svg";
const route = "employees";
const queryClient = useQueryClient();
const { data: employeeList, error, isLoading } = useEmployeeList();

// Check if employee is manager
const isManager = computed(() => {
  const employeeMail = getCookie("email")
  return employeeList.value?.find((employee) => employee.email === employeeMail)?.role === "MANAGER";
});

let rows = {
    'id': 'ID',
    'email': 'Email',
    'role': 'Role',
    'name': 'Prénom',
    'surname': 'Nom'
}
let actionList = {
    'upgrade': {
        'icon': '🔼',
        'color': 'bg-green-300 text-white enabled:hover:bg-green-400'
    },
    'downgrade': {
        'icon': '🔽',
        'color': 'bg-orange-300 text-white enabled:hover:bg-orange-400'
    },
    'remove': {
        'icon': '❌',
        'color': 'bg-gray-300 text-white enabled:hover:bg-gray-400'
    },
}

const refresh = async () => {
    await queryClient.refetchQueries(employeesKeys.employeeList);
};
</script>

<style scoped>
</style>