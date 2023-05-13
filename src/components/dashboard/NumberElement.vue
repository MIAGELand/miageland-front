<script setup lang="ts">
import {computed, PropType} from "vue";
import {size} from "../../models/models";

const props = defineProps({
    data: Array,
    title: String,
    size: Object as PropType<size>,
});

const numberSizeClass = computed(() => {
    if (props.size === 'sm') {
        return 'text-md';
    } else if (props.size === 'md') {
        return 'text-xl';
    } else if (props.size === 'lg') {
        return 'text-3xl';
    }
});

const titleSizeClass = computed(() => {
    if (props.size === 'sm') {
        return 'text-sm';
    } else if (props.size === 'md') {
        return 'text-md';
    } else if (props.size === 'lg') {
        return 'text-xl';
    }
});
</script>

<template>
    <div :class=numberSizeClass class="font-extrabold">
        {{ data.length }}
    </div>
    <div :class="titleSizeClass">
        {{ title }}
    </div>
</template>

<style scoped>

</style>