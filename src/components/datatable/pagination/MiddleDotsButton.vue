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

defineEmits(['update'])
</script>

<template>
    <button
            :key="currentPage"
            @click="$emit('update', currentPage = Math.ceil(totalPages / 2))"
            class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-white text-gray-800 text-sm font-medium rounded w-10 h-10"
    >
        ...
    </button>
</template>

<style scoped>

</style>