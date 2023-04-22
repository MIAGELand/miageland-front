<template>
    <div class="flex">
        <vertical-navbar :title="title" :logoUrl="logoUrl"/>
        <div class="flex ml-8 mt-8 text-3xl font-bold">
            <img :src="logoUrl" alt="locker" class="h-8 w-8 mr-4" />
            {{ title }}
        </div>
    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../layouts/VerticalNavbar.vue";

const title = "Attractions";
const logoUrl = "src/assets/attractions.svg";
</script>

<style scoped>
</style>
