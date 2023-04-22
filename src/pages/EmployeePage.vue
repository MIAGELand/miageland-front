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
                    <data-table :data="employeeList" :rows="rows"></data-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../layouts/VerticalNavbar.vue";
import {useEmployeeList} from "../queries/employee.query";
import DataTable from "../components/DataTable.vue";

const title = "Employés";
const logoUrl = "src/assets/employees.svg";

const { data, error, isLoading } = useEmployeeList();
let employeeList = data;
let rows = ['name', 'surname', 'email'];
</script>

<style scoped>
</style>
