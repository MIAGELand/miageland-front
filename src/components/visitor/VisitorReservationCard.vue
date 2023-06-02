<script setup lang="ts">
import {computed, PropType, ref} from "vue";
import { Ticket } from "../../models/models";
import moment from "moment";

const props = defineProps({
  ticket: Object as PropType<Ticket>,
});

const date = moment(props.ticket.date).format("DD/MM/YYYY");
const state = ref(props.ticket.state);
const formattedState = computed(() => {
  if (state.value === "PAID") {
    return "Payé";
  } else if (state.value === "CANCELLED") {
    return "Annulé";
  } else if (state.value === "USED") {
    return "Utilisé";
  } else if (state.value === "RESERVED") {
    return "Réservé";
  }
});
</script>

<template>
  <div class="shadow-2xl bg-slate-600 rounded-lg py-2 border-4"
       :class="{'border-green-500 ' : ticket.state === 'PAID',
                'border-red-700' : ticket.state === 'CANCELLED',
                'border-grey-200' : ticket.state === 'USED',
                'border-yellow-400' : ticket.state === 'RESERVED'}">
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
          {{ formattedState }}
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
