<template>
    <div id="container">
        <div class="text-center font-bold">
            <h1 class="text-4xl">MIAGELand</h1>
            <login-input />
        </div>
    </div>
</template>

<script setup lang="ts">
import LoginInput from "../components/LoginInput.vue";
</script>

<style scoped>
#container {
    margin: 4vh 10vw 4vh 10vw;
}
</style>
