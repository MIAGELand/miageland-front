<script setup lang="ts">
const props = defineProps({
    totalPages: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    },
    action: {
        type: String,
        required: true
    }
})

const move = props.action === 'next' ?  1 :  - 1 ;
const isDisabled = () => {
    return props.action === 'next' && props.currentPage === props.totalPages
        || props.action === 'previous' && props.currentPage === 1;
}
defineEmits(['update'])
</script>

<template>
    <button
            @click="$emit('update', currentPage = currentPage + move)"
            :disabled="isDisabled()"
            class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-white text-gray-800 text-sm font-medium rounded w-10 h-10 disabled:opacity-50"
    >
        <slot></slot>
    </button>
</template>

<style scoped>

</style>