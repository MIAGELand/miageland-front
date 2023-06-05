<template>
  <div class="flex">
    <vertical-navbar />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-semibold">
        <img
          src="../../assets/attractions.svg"
          alt="locker"
          class="h-8 w-8 mr-4"
        />
        {{ title }}
      </div>

      <!-- EMPLOYEES -->
      <div class="m-8" v-if="!isClassic">
        <div class="rounded-lg">
          <data-table
            v-if="isLoading"
            :data="[]"
            :rows="rows"
            :action-list="actionList"
            :entity="route"
            :filters="filters"
            :initLoading="isLoading"
            @refresh="refresh"
          ></data-table>
          <data-table
            v-else
            :data="attractionList"
            :rows="rows"
            :action-list="actionList"
            :entity="route"
            :filters="filters"
            :initLoading="isLoading"
            @refresh="refresh"
          ></data-table>
        </div>
      </div>
      <unauthorized-info v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../../layouts/VerticalNavbar.vue";
import DataTable from "../../components/datatable/DataTable.vue";
import { useQueryClient } from "@tanstack/vue-query";
import {
  attractionsKeys,
  useAttractionList,
} from "../../queries/attraction.query";
import { useEmployeeList } from "../../queries/employee.query";
import { computed } from "vue";
import { getCookie } from "../../util/cookie";
import UnauthorizedInfo from "../../components/UnauthorizedInfo.vue";

const title = "Attractions";
const logoUrl = "src/assets/attractions.svg";
const route = "attractions";
const queryClient = useQueryClient();
const { data: attractionList, error, isLoading } = useAttractionList();
const { data: employeeList } = useEmployeeList();

// Check if employee is not classic
const isClassic = computed(() => {
  const employeeMail = getCookie("email");
  return (
    employeeList.value?.find((employee) => employee.email === employeeMail)
      ?.role === "CLASSIC"
  );
});

let rows = {
  id: "ID",
  name: "Nom",
  opened: "Ouverte",
};

let filters = {
  id: {
    label: "ID",
    type: "number",
  },
  name: {
    label: "Nom",
    type: "text",
  },
  opened: {
    label: "Ouverte",
    type: "true | false",
  },
};
let actionList = {
  open: {
    icon: "🔓",
    color: "bg-green-300 text-white enabled:hover:bg-green-400",
  },
  close: {
    icon: "🔒",
    color: "bg-orange-300 text-white enabled:hover:bg-orange-400",
  },
  removeAttraction: {
    icon: "❌",
    color: "bg-gray-300 text-white enabled:hover:bg-gray-400",
  },
};

const refresh = async () => {
  await queryClient.refetchQueries(attractionsKeys.attractionList);
};
</script>

<style scoped></style>
