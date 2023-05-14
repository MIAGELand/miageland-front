<script setup lang="ts">
defineProps({
    currentPage: {
        type: Number,
        required: true
    }
})

defineEmits(['update'])
</script>

<template>
    <button
            :key="1"
            @click="$emit('update', currentPage = 1)"
            :class="{
                          'bg-gray-800': 1 === currentPage,
                          'bg-white text-gray-500': 1 !== currentPage
                        }"
            class="relative inline-flex items-center justify-center py-2 border border-gray-300 text-sm font-medium rounded w-10 h-10"
    >
        1
    </button>
</template>

<style scoped>

</style>