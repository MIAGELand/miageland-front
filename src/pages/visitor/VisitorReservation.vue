<template>
  <Toaster position="top-right" richColors />
  <div class="flex">
    <VerticalVisitor />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-bold">
        <img :src="logoUrl" alt="visitor" class="h-8 w-8 mr-4" />
        {{ title }}
      </div>

      <!-- RESERVATIONS -->
      <div class="m-8 flex flex-col gap-4">
        <div>
          <select
            v-model="selected"
            class="w-32 h-10 rounded-md px-2 text-black"
          >
            <option value="ALL">Tous</option>
            <option value="RESERVED">Réservé</option>
            <option value="PAID">Payé</option>
            <option value="CANCELLED">Annulé</option>
          </select>
        </div>

        <div
          v-if="!isLoading"
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <visitor-reservation-card
            v-for="ticket in sortedTickets"
            :ticket="ticket"
            :key="ticket.id"
            @cancelTicket="cancel"
            @payTicket="pay"
            :class="
              selected === 'ALL'
                ? ''
                : ticket.state === selected
                ? ''
                : 'hidden'
            "
          />
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
let queryClient = useQueryClient();

const title = "Réservations";
const logoUrl = "src/assets/calendar.svg";

const id = computed(() => getCookie("id"));
const { data: tickets, isLoading } = useTicketListByVisitor(Number(id.value));

const selected = ref("RESERVED");

const sortedTickets = computed(() => {
  if (tickets) {
    const ticketList = [...tickets.value];
    return ticketList.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
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

const refresh = async () => {
  await queryClient.refetchQueries({
    ...visitorKeys.getTicketListByVisitor(Number(id.value)),
  });
};
</script>

<style scoped></style>
