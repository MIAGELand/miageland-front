<script setup lang="ts">
defineProps({
    content: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="flex mt-1 mb-2 w-fit justify-center px-4 py-1 bg-gray-100 rounded-xl">
        <div>
            <span class="text-sm font-medium text-gray-700 rounded-xl">{{ content }}</span>
        </div>
    </div>
</template>

<style scoped>

</style>