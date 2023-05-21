<template>
  <Toaster position="top-right" richColors/>
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
        <div v-if="!isLoading" class="flex flex-col gap-4">
          <visitor-reservation-card
              v-for="ticket in sortedTickets"
              :ticket="ticket"
              :key="ticket.id"
              @cancelTicket="cancel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalVisitor from "../../layouts/VerticalVisitor.vue";
import {useTicketListByVisitor, visitorKeys} from "../../queries/visitor.query";
import {computed} from "vue";
import {getCookie} from "../../util/cookie";
import VisitorReservationCard from "../../components/visitor/VisitorReservationCard.vue";
import {toast, Toaster} from "vue-sonner";
import {cancelTicket} from "../../service/ticket-service";
import {useQueryClient} from "@tanstack/vue-query";
let queryClient = useQueryClient();

const title = "Réservations";
const logoUrl = "src/assets/calendar.svg";

const id = computed(() => getCookie("id"))
const { data: tickets, isLoading } = useTicketListByVisitor(Number(id.value));

const sortedTickets = computed(() => {
  if (tickets) {
    const ticketList = [...tickets.value];
    return ticketList.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
});

const cancel = (ticketId: number) => {
  cancelTicket(ticketId).then((data) => {
    toast.success('Ticket annulé avec succès. ' +
        'Remboursement de ' + data['price'] + '€.');
    refresh();
  }).catch(() => {
    toast.error('Erreur lors de l\'annulation du ticket.');
  });
}

const refresh = async () => {
  await queryClient.refetchQueries({
    ...visitorKeys.getTicketListByVisitor(Number(id.value)),
  });};
</script>

<style scoped>
</style>
