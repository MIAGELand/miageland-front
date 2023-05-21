<template>
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
          <visitor-reservation-card  v-for="ticket in tickets" :ticket="ticket" :key="ticket.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalVisitor from "../../layouts/VerticalVisitor.vue";
import {useTicketListByVisitor} from "../../queries/visitor.query";
import {computed} from "vue";
import {getCookie} from "../../util/cookie";
import VisitorReservationCard from "../../components/visitor/VisitorReservationCard.vue";

const title = "Réservations";
const logoUrl = "src/assets/tickets.svg";

const id = computed(() => getCookie("id"))
const { data: tickets, isLoading } = useTicketListByVisitor(Number(id.value));
</script>

<style scoped>
</style>
