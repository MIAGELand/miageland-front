<template>
  <Toaster position="top-right" richColors closeButton :expand="false" />
  <div class="flex">
    <VerticalVisitor />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-semibold">
        <img
          src="../../assets/tickets.svg"
          alt="visitor"
          class="h-8 w-8 mr-4"
        />
        {{ title }}
      </div>

      <!-- VISITOR ACCESS -->
      <div class="m-8 flex flex-col gap-4">
        <div class="flex gap-8 text-xl">
          <DatePicker
            v-model="date"
            v-if="!isLoading"
            :min-date="new Date()"
            :disabled-dates="disabledDates"
          />
          <div class="flex flex-col gap-4 w-full">
            <div class="flex flex-col gap-4 bg-slate-600 p-4 rounded-lg h-fit">
              <div>
                <span class="font-semibold">Prix : </span>
                <span v-if="price !== 0 && date !== null"> {{ price }}€ </span>
              </div>
              <div>
                <span class="font-semibold">Nb places restantes : </span>
                <span v-if="date !== null">
                {{ nbTicketAvailable }}
              </span>
              </div>
            </div>
            <button
                @click="reserve"
                :disabled="date === null || nbTicketAvailable === 0"
                class="bg-teal-700 enabled:hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalVisitor from "../../layouts/VerticalVisitor.vue";
import { computed, ref, watch } from "vue";
import { api } from "../../main";
import { toast, Toaster } from "vue-sonner";
import { getCookie } from "../../util/cookie";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";
import moment from "moment";
import { parkKeys, useParkInfo } from "../../queries/park.query";
import { ticketKeys, useTicketStats } from "../../queries/ticket.query";
import { useQueryClient } from "@tanstack/vue-query";

const title = "Acheter billets";
const logoUrl = "../../assets/tickets.svg";

const date = ref(null);
const price = ref(0);

const name = getCookie("name");
const surname = getCookie("surname");
const email = getCookie("email");

const { data: parkInfo, isLoading: parkInfoLoading } = useParkInfo();
const { data: tickets, isLoading: ticketStatsLoading } = useTicketStats();

const isLoading = computed(() => {
  return parkInfoLoading.value || ticketStatsLoading.value;
});

const disabledDates = computed(() => {
  if (tickets.value.dailyTicketInfos === null) {
    return [];
  }
  const disabledDates = [];
  tickets.value.dailyTicketInfos.forEach((ticket) => {
    if (ticket.numberStatsTicket.nbTotal >= gauge.value) {
      disabledDates.push(new Date(ticket.dayMonthYear));
    }
  });
  return disabledDates;
});

const gauge = computed(() => {
  if (parkInfo.value === null) {
    return 0;
  } else {
    return parkInfo.value.gauge;
  }
});

const nbTicketsByDate = computed(() => {
  if (tickets.value.dailyTicketInfos === null) {
    return 0;
  }
  const ticket = tickets?.value.dailyTicketInfos.find((ticket) => {
    return (
      moment(ticket.dayMonthYear).format("YYYY-MM-DD") ===
        moment(date.value).format("YYYY-MM-DD") ?? 0
    );
  });
  return ticket?.numberStatsTicket.nbTotal ?? 0;
});

const nbTicketAvailable = computed(() => {
  return gauge.value - nbTicketsByDate.value;
});

watch(date, () => {
  generateRandomPrice();
});
const generateRandomPrice = () => {
  price.value = Math.floor(Math.random() * (1000 - 50 + 1)) + 50;
};

const reserve = () => {
  const convertedDate = moment(date.value).format("YYYY-MM-DD");
  const data = {
    date: convertedDate,
    price: price.value,
    name: name,
    surname: surname,
    email: email,
  };
  api
    .post("/tickets", {
      "0": data,
    })
    .then(() => {
      toast.success("Billet réservé");
      refresh();
    })
    .catch(() => {
      toast.error("Erreur lors de l'achat du billet");
    });
};
const queryClient = useQueryClient();
const refresh = async () => {
  await queryClient.refetchQueries(ticketKeys.ticketStats);
  await queryClient.refetchQueries(parkKeys.getParkInfo);
};
</script>

<style scoped></style>
