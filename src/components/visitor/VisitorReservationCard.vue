<script setup lang="ts">
import {PropType} from "vue";
import {Ticket} from "../../models/models";
import moment from "moment";

const props = defineProps({
  ticket: Object as PropType<Ticket>,
})

const date = moment(props.ticket.date).format("DD/MM/YYYY")
</script>

<template>
  <div class="shadow-2xl bg-slate-600 rounded-lg py-2 h-fit hover:bg-gray-700 transition ease-in-out">
    <div class="flex flex-col gap-2 px-4">
      <div class="flex justify-between">
        <div class="text-xl">
          <span>🆔  </span>
          <span>{{ticket.id}}</span>
        </div>
        <div class="text-xl">
          <span v-if="ticket.state === 'CANCELLED'">🔴</span>
          <span v-if="ticket.state === 'PAID'">🟢</span>
          <span v-if="ticket.state === 'USED'">⚪️</span>
          {{ticket.state}}
        </div>
      </div>
      <div class="text-xl">
        <span>📆  </span>
        <span>{{date}}</span>
      </div>
      <div class="text-xl">
        <span>💶  </span>
        <span>{{ticket.price}} €</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>