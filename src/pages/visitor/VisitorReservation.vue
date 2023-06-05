<template>
  <Toaster position="top-right" richColors />
  <div class="flex">
    <VerticalVisitor />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-semibold">
        <img
          src="../../assets/calendar.svg"
          alt="visitor"
          class="h-8 w-8 mr-4"
        />
        {{ title }}
      </div>

      <!-- RESERVATIONS -->
      <div class="m-8 flex flex-col gap-4">
        <div
          class="flex flex-col bg-white rounded-lg p-2 px-4 w-fit gap-4 md:flex-row justify-between items-center"
        >
          <div class="flex flex-col gap-4 h-full items-end md:flex-row">
            <!-- STATES FILTER -->
            <div class="flex flex-col text-gray-900 h-full justify-evenly">
              <span class="text-xl mb-2">État(s) :</span>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="(state, index) in states"
                  :key="index"
                  class="flex gap-2 items-center"
                >
                  <input
                    type="checkbox"
                    :id="state"
                    :value="state"
                    v-model="selectedStates"
                    class="form-checkbox h-5 w-5 text-gray-700"
                  />
                  <label :for="state" class="text-gray-700">{{
                    formattedState(state)
                  }}</label>
                </div>
              </div>
            </div>

            <!-- SEPARATOR -->
            <div class="h-full w-1 bg-gray-700 rounded"></div>

            <div class="flex flex-col text-gray-900 h-full justify-between">
              <span class="text-xl mb-2">Date :</span>
              <div class="flex gap-2 text-gray-700">
                <DateFilter @updateRange="filterDays" />
                <div class="flex flex-col justify-center">
                  <span class="flex gap-2 justify-between">
                    <span>Du :</span> <span>{{ startDate }}</span>
                  </span>
                  <span class="flex gap-2 justify-between">
                    <span>Au :</span> <span>{{ endDate }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="h-full w-1 bg-gray-700 rounded"></div>

          <div class="flex flex-col gap-4 h-full md:flex-row">
            <button
              class="px-2 py-2 text-white rounded-lg bg-red-800 h-full hover:bg-red-900 transition-all"
              @click="reset"
            >
              Reset
            </button>
          </div>
        </div>
        <div v-if="!isLoading">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <visitor-reservation-card
              v-for="ticket in formattedTickets"
              :ticket="ticket"
              :key="ticket.id"
              @cancelTicket="cancel"
              @payTicket="pay"
              :class="selectedStates.includes(ticket.state) ? '' : 'hidden'"
            />
          </div>
          <div v-if="getNbTickets() === 0" class="text-3xl text-center mt-4">
            <span>😢 Pas de réservations...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalVisitor from "../../layouts/VerticalVisitor.vue";
import {
  useTicketListByVisitor,
  visitorKeys,
} from "../../queries/visitor.query";
import { computed, ref } from "vue";
import { getCookie } from "../../util/cookie";
import VisitorReservationCard from "../../components/visitor/VisitorReservationCard.vue";
import { toast, Toaster } from "vue-sonner";
import { cancelTicket, payTicket } from "../../service/ticket-service";
import { useQueryClient } from "@tanstack/vue-query";
import DateFilter from "../../components/dashboard/DateFilter.vue";
import moment from "moment/moment";
let queryClient = useQueryClient();

const title = "Réservations";
const logoUrl = "../../assets/calendar.svg";

const id = computed(() => getCookie("id"));
const { data: tickets, isLoading } = useTicketListByVisitor(Number(id.value));

// init start date at the beginning of the month and end date at the end of year
const startDate = ref(moment().startOf("month").format("YYYY-MM-DD"));
const endDate = ref(moment().endOf("year").format("YYYY-MM-DD"));

const states = ["RESERVED", "PAID", "CANCELLED", "USED"];

const selectedStates = ref(["RESERVED", "PAID", "CANCELLED", "USED"]);

const reset = () => {
  startDate.value = moment().startOf("month").format("YYYY-MM-DD");
  endDate.value = moment().endOf("year").format("YYYY-MM-DD");
  selectedStates.value = ["RESERVED", "PAID", "CANCELLED", "USED"];
};

const formattedTickets = computed(() => {
  if (tickets) {
    const ticketList = [...tickets.value];
    return ticketList
      .sort((a, b) => {
        return (
          moment(b.date).toDate().getTime() - moment(a.date).toDate().getTime()
        );
      })
      .filter((ticket) => {
        return (
          moment(ticket.date).format("YYYY-MM-DD") >= startDate.value &&
          moment(ticket.date).format("YYYY-MM-DD") <= endDate.value
        );
      });
  }
});

const cancel = (ticketId: number) => {
  const prevState = tickets.value?.find(
    (ticket) => ticket.id === ticketId
  )?.state;
  cancelTicket(ticketId)
    .then((data) => {
      if (prevState === "PAID") {
        toast.success(
          "Ticket annulé avec succès. " +
            "Remboursement de " +
            data["price"] +
            "€."
        );
      } else if (prevState === "RESERVED") {
        toast.success("Ticket annulé avec succès. Pas de remboursement.");
      }
      refresh();
    })
    .catch(() => {
      toast.error("Erreur lors de l'annulation du ticket.");
    });
};

const pay = (ticketId: number) => {
  payTicket(ticketId)
    .then(() => {
      toast.success("Ticket payé avec succès.");
      refresh();
    })
    .catch(() => {
      toast.error("Erreur lors du paiement du ticket.");
    });
};

const filterDays = (range) => {
  startDate.value = moment(range.start).format("YYYY-MM-DD");
  endDate.value = moment(range.end).format("YYYY-MM-DD");
};

const formattedState = (state) => {
  switch (state) {
    case "RESERVED":
      return "Réservé";
    case "PAID":
      return "Payé";
    case "CANCELLED":
      return "Annulé";
    case "USED":
      return "Utilisé";
    default:
      return "Inconnu";
  }
};

const getNbTickets = () => {
  if (tickets) {
    return tickets.value
      .filter((ticket) => {
        return (
          moment(ticket.date).format("YYYY-MM-DD") >= startDate.value &&
          moment(ticket.date).format("YYYY-MM-DD") <= endDate.value
        );
      })
      .filter((ticket) => {
        return selectedStates.value.includes(ticket.state);
      }).length;
  }
};

const refresh = async () => {
  await queryClient.refetchQueries({
    ...visitorKeys.getTicketListByVisitor(Number(id.value)),
  });
};
</script>

<style scoped></style>
