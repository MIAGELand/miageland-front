<template>
    <div>
        <input type="text" class="py-2 pl-3 pr-10 leading-tight bg-white border border-gray-400 text-gray-800 rounded-xl appearance-none focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Rechercher..." :value="searchText" @input="update($event)">
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
    searchText: {
        type: String,
    }
})

const emit = defineEmits(['update'])

const update = (e: any) => {
    emit('update', e.target.value)
}
</script>

<style scoped>
/* Styles for the component go here */
</style>
