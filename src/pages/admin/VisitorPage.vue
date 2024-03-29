<template>
  <div class="flex">
    <vertical-navbar />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-semibold">
        <img
          src="../../assets/visitors.svg"
          alt="visitor"
          class="h-8 w-8 mr-4"
        />
        {{ title }}
      </div>

      <!-- VISITORS -->
      <div class="m-8">
        <div class="rounded-lg">
          <!-- LOADING W/ EMPTY DATATABLE -->
          <data-table
            v-if="isLoading"
            :data="[]"
            :rows="rows"
            :action-list="actionList"
            :entity="route"
            :current-page="page + 1"
            :total-data="totalVisitors"
            :filters="filters"
            :initLoading="isLoading"
            @refresh="refresh"
            @update="updateCurrentPage"
          />
          <!-- DATATABLE WITH REAL DATA LOADED -->
          <data-table
            v-else
            :data="visitorList"
            :rows="rows"
            :action-list="actionList"
            :entity="route"
            :total-data="totalVisitors"
            :current-page="page + 1"
            :filters="filters"
            :initLoading="isLoading"
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
import { useQueryClient } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import {
  useVisitorListByPage,
  useVisitorStats,
  visitorKeys,
} from "../../queries/visitor.query";

const title = "Visiteurs";
const route = "visitors";
const queryClient = useQueryClient();
const page = ref(0);

const { isLoading, data: visitorList } = useVisitorListByPage(page);
const { data: visitorStats } = useVisitorStats();

const totalVisitors = computed(() => {
  if (visitorStats.value) {
    return visitorStats.value.nbTotal;
  }
});

let rows = {
  id: "ID",
  email: "Email",
  name: "Prénom",
  surname: "Nom",
  nbTicket: "Nb tickets",
};

let filters = {
  id: {
    label: "ID",
    type: "number",
  },
  email: {
    label: "Email",
    type: "email",
  },
  name: {
    label: "Prénom",
    type: "text",
  },
  surname: {
    label: "Nom",
    type: "text",
  },
};

let actionList = {
  removeVisitor: {
    icon: "❌",
    color: "bg-gray-300 text-white enabled:hover:bg-gray-400",
  },
};
const updateCurrentPage = (newPage: number) => {
  page.value = newPage - 1;
};
const refresh = async () => {
  await queryClient.refetchQueries({
    ...visitorKeys.visitorListByPage(page),
  });
};
</script>

<style scoped></style>
