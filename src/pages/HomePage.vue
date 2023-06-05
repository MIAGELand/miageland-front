<template>
  <div id="container">
    <h1 class="text-center text-4xl mb-8 md:text-left">🎢 MIAGELand</h1>
    <div class="text-center flex flex-col items-center gap-8">
      <navigation-bar :active="active" @nav="updateNav" />
      <div v-show="showAdmin">
        <p class="text-xl">Connexion</p>
        <login-input-employee />
      </div>
      <div
        class="flex flex-col gap-4 md:flex-row justify-evenly"
        v-show="!showAdmin"
      >
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
import SignUpInput from "../components/connexion/SignUpInput.vue";
import LoginInputEmployee from "../components/connexion/LoginInputEmployee.vue";
import LoginInputVisitor from "../components/connexion/LoginInputVisitor.vue";
import NavigationBar from "../components/connexion/NavigationBar.vue";
import { ref } from "vue";

const showAdmin = ref(false);
const active = ref("visiteur");
const updateNav = (nav: string) => {
  if (nav === "visiteur") {
    active.value = "visiteur";
    showAdmin.value = false;
  } else if (nav === "admin") {
    active.value = "admin";
    showAdmin.value = true;
  }
};
</script>

<style scoped>
#container {
  margin: 4vh 10vw 4vh 10vw;
}
</style>
