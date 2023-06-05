<template>
  <Toaster position="top-right" richColors closeButton :expand="false" />
  <div class="flex">
    <vertical-navbar />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-bold">
        <img src="../../assets/park.svg" alt="park" class="h-8 w-8 mr-4" />
        {{ title }}
      </div>

      <!-- GENERATORS -->
      <div class="m-8" v-if="isManager">
        <span v-if="isLoading"> Loading... </span>
        <div v-else class="flex flex-col gap-12">
          <div class="flex flex-col gap-4 w-full">
            <div class="text-2xl">✋ Jauge</div>
            <div class="flex gap-8 justify-center">
              <div class="flex flex-col text-lg bg-gray-700 p-4 rounded-lg">
                <div class="flex flex-col justify-between">
                  <span>Tickets max actuel :</span>
                  <span>{{ currentGauge }}</span>
                </div>
              </div>
              <div class="flex flex-col text-lg bg-gray-700 p-4 rounded-lg">
                <div class="flex flex-col justify-between">
                  <span>Modifié le :</span>
                  <span>{{ lastModifiedGauge }}</span>
                </div>
              </div>
            </div>
            <div class="text-center flex flex-col">
              <span>Nb tickets max : {{ gauge }}</span>
              <input
                type="range"
                v-model="gauge"
                :min="minTicketGauge"
                max="30000"
              />
            </div>

            <button
              class="bg-blue-700 enabled:hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-2 disabled:opacity-50"
              @click="setNewGauge(gauge)"
            >
              Valider
            </button>
          </div>
        </div>
      </div>
      <unauthorized-info v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../../layouts/VerticalNavbar.vue";
import { computed, ref, watch } from "vue";
import { setGauge } from "../../service/park-service";
import { Toaster, toast } from "vue-sonner";
import { parkKeys, useParkInfo } from "../../queries/park.query";
import moment from "moment";
import { useQueryClient } from "@tanstack/vue-query";
import { useEmployeeList } from "../../queries/employee.query";
import { getCookie } from "../../util/cookie";
import UnauthorizedInfo from "../../components/UnauthorizedInfo.vue";
const queryClient = useQueryClient();

const title = "Parc";

const { data: parkInfo, isLoading: parkInfoLoading } = useParkInfo();
const { data: employeeList } = useEmployeeList();

// Check if employee is manager
const isManager = computed(() => {
  const employeeMail = getCookie("email");
  return (
    employeeList.value?.find((employee) => employee.email === employeeMail)
      ?.role === "MANAGER"
  );
});

const isLoading = computed(() => {
  return parkInfoLoading.value;
});

const currentGauge = computed(() => {
  return parkInfo.value?.gauge;
});

const lastModifiedGauge = computed(() => {
  return moment(parkInfo.value?.modifiedAt).format("DD/MM/YYYY à HH:mm");
});

const gauge = ref(0);

const minTicketGauge = computed(() => {
  return parkInfo.value?.minTicketGauge === 0
    ? 100
    : parkInfo.value?.minTicketGauge;
});

const setNewGauge = (gauge: number) => {
  toast.message("Mise à jour de la jauge...");
  setGauge(gauge)
    .then((data) => {
      toast.success("Jauge mise à jour à " + data.gauge);
      refresh();
    })
    .catch(() => {
      toast.error("Erreur lors de la mise à jour de la jauge");
    });
};

const refresh = async () => {
  await queryClient.refetchQueries(parkKeys.getParkInfo.queryKey);
};

watch(parkInfoLoading, () => {
  gauge.value = parkInfo.value.gauge;
});
</script>
<style scoped></style>
