<script setup lang="ts">
import { PropType } from "vue";
import { Ticket } from "../../models/models";
import moment from "moment";

const props = defineProps({
  ticket: Object as PropType<Ticket>,
});

const date = moment(props.ticket.date).format("DD/MM/YYYY");
</script>

<template>
  <div class="shadow-2xl bg-slate-600 rounded-lg py-2">
    <div class="flex flex-col gap-2 px-4 h-full justify-between">
      <div class="flex justify-between">
        <div class="text-xl">
          <span>🆔 </span>
          <span>{{ ticket.id }}</span>
        </div>
        <div class="text-xl">
          <span v-if="ticket.state === 'CANCELLED'">🔴</span>
          <span v-if="ticket.state === 'PAID'">🟢</span>
          <span v-if="ticket.state === 'USED'">⚪️</span>
          <span v-if="ticket.state === 'RESERVED'">🔒</span>
          {{ ticket.state }}
        </div>
      </div>
      <div class="text-xl">
        <span>📆 </span>
        <span>{{ date }}</span>
      </div>
      <div class="flex justify-between items-end">
        <div class="text-xl">
          <span>💶 </span>
          <span>{{ ticket.price }} €</span>
        </div>
        <div class="flex gap-2">
          <div v-if="ticket.state === 'PAID' || ticket.state === 'RESERVED'">
            <button
              @click="$emit('cancel-ticket', ticket.id)"
              class="bg-red-700 text-white px-2 py-1 rounded-md hover:bg-red-800"
            >
              Annuler
            </button>
          </div>
          <div v-if="ticket.state === 'RESERVED'">
            <button
              @click="$emit('pay-ticket', ticket.id)"
              class="bg-blue-900 text-white px-2 py-1 rounded-md hover:bg-blue-950"
            >
              Payer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
