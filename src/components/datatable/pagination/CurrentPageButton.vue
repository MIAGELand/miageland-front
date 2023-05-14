<script setup lang="ts">
defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
})
</script>

<template>
    <button
            :key="currentPage"
            class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-gray-800 text-white text-sm font-medium rounded w-10 h-10"
    >
        {{ currentPage }}
    </button>
</template>

<style scoped>

</style>