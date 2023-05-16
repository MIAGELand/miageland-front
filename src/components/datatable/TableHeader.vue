<script setup lang="ts">

import {PropType} from "vue";

defineProps({
    rows: {
        type: Object as PropType<string[]>,
        required: true
    }
})

</script>

<template>
    <thead class="bg-gray-100">
    <tr>
        <th v-for="row in rows" scope="col" class="px-6 py-3 text-left text-gray-700 uppercase tracking-wider cursor-pointer">
            {{ row }}
        </th>
        <th class="px-6 py-3 text-left text-gray-700 uppercase tracking-wider cursor-pointer">
            Actions
        </th>
    </tr>
    </thead>
</template>

<style scoped>

</style>