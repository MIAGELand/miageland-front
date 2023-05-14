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
            v-if="totalPages > 1"
            :key="totalPages"
            @click="$emit('update', currentPage = totalPages)"
            :class="{
                          'bg-gray-800': totalPages === currentPage,
                          'bg-white text-gray-500': totalPages !== currentPage
                        }"
            class="relative inline-flex items-center justify-center py-2 border border-gray-300 text-sm font-medium rounded w-10 h-10"
    >
        {{ totalPages }}
    </button>
</template>

<style scoped>

</style>