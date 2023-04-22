<template>
    <div class="flex flex-col border border-white w-full rounded my-2 p-6 text-xl">
        <div>
            <span class="font-bold">ID</span> : {{ props.ticket.nbTicket }}
        </div>
        <div>
            <span class="font-bold">Date</span> : {{ props.ticket.date }}
        </div>
        <div>
            <span class="font-bold">Prix</span> : {{ props.ticket.price }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ticket } from "../models/models";
import {PropType} from "vue";

const props = defineProps({
    ticket: {
        type: Object as PropType<Ticket>,
        required: true
    }
});
</script>