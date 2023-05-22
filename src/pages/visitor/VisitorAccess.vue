<template>
  <Toaster position="top-right" richColors closeButton :expand="false" />
  <div class="flex">
    <VerticalVisitor />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-bold">
        <img :src="logoUrl" alt="visitor" class="h-8 w-8 mr-4" />
        {{ title }}
      </div>

      <!-- VISITOR ACCESS -->
      <div class="m-8 flex flex-col gap-4">
        <div class="w-fit text-gray-800">
          <input type="date" v-model="date" class="bg-white rounded-lg p-2 shadow-xl"
          :onchange="generateRandomPrice"/>
        </div>
        <div v-if="price !== 0">
          Prix : {{ price }}€
        </div>
        <button
            @click="buy"
            :disabled="date === null"
            class="bg-teal-700 w-fit enabled:hover:bg-teal-800 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
            Réserver
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import VerticalVisitor from "../../layouts/VerticalVisitor.vue";
import {ref} from "vue";
import {api} from "../../main";
import {toast, Toaster} from "vue-sonner";
import {getCookie} from "../../util/cookie";

const title = "Acheter billets";
const logoUrl = "src/assets/tickets.svg";

const date = ref(null);
const price = ref(0);
const name = getCookie("name")
const surname = getCookie("surname")

const generateRandomPrice = () => {
  // Price must be between 50 and 1000
    price.value = Math.floor(Math.random() * (1000 - 50 + 1)) + 50;
}

const buy = () => {
  const data = {
      date: date.value,
      price: price.value,
      name: name,
      surname: surname
  }
  api.post("/tickets", {
    "0": data
  }).then(() => {
    toast.success("Billet acheté")
  }).catch(() => {
    toast.error("Erreur lors de l'achat du billet")
  })
}
</script>

<style scoped>
</style>
