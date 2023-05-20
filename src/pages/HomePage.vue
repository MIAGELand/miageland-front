<template>
    <div id="container">
        <div class="text-center font-bold flex flex-col gap-4">
            <h1 class="text-4xl">MIAGELand</h1>
            <login-input-employee />
            <span><hr></span>
            <div class="flex justify-center gap-4">
              <div>
                <p class="text-xl">Connexion</p>
                <login-input-visitor />
              </div>
              <div>
                <p class="text-xl">Inscription</p>
                <sign-up-input />
              </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoginInput from "../components/connexion/LoginInputEmployee.vue";
import SignUpInput from "../components/connexion/SignUpInput.vue";
import LoginInputEmployee from "../components/connexion/LoginInputEmployee.vue";
import LoginInputVisitor from "../components/connexion/LoginInputVisitor.vue";
</script>

<style scoped>
#container {
    margin: 4vh 10vw 4vh 10vw;
}
</style>
