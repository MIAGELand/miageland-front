<template>
  <!-- Create a Login input with a button to connect and check email part -->
  <Toaster position="top-right" richColors />
  <div class="mt-2">
    <div class="flex justify-center">
      <div class="flex justify-center">
        <input
          v-model="email"
          v-on:keydown.enter="connect"
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-3"
          placeholder="john.doe@company.com"
          required
        />
      </div>
    </div>
    <div>
      <button
        class="bg-teal-600 text-xl text-white font-bold py-2 px-4 rounded-xl mt-4 hover:bg-teal-700 disabled:bg-gray-400"
        @click="connect"
        :disabled="email === ''"
      >
        Se connecter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getEmployee } from "../../service/employee-service";
import { useRouter } from "vue-router";
import { toast, Toaster } from "vue-sonner";
const router = useRouter();
const email = ref("");
const connect = async () => {
  getEmployee(email.value)
    .then(() => {
      router.push({ name: "Employees" });
    })
    .catch(() => {
      toast.error("Erreur lors de la connexion");
    });
};
</script>
