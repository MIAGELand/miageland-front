<template>
  <!-- Create a Login input with a button to connect and check email part -->
  <div class="mt-8">
      <div class="flex justify-center ">
          <div class="flex items-end mr-2">
              <label for="email" class="block mb-2 text-xl font-medium" >Email</label>
          </div>
          <div class="flex justify-center">
              <input v-model="email" v-on:keydown.enter="connect" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-3" placeholder="john.doe@company.com" required>
          </div>
      </div>
      <div>
          <button class="bg-teal-600 text-xl text-white font-bold py-2 px-4 rounded-xl mt-4 hover:bg-teal-700 disabled:bg-gray-400"
                  @click="connect"
                  :disabled="email === ''">
              Se connecter
          </button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getEmployee} from "../service/employee-service";
import { useRouter} from "vue-router";
const router = useRouter();
const email = ref('');

const connect = async () => {
    const employee = await getEmployee(email.value);
    if (employee) {
        document.cookie = "email=" + employee.email + ";";
        await router.push({name: 'Employees'});
    } else {
        alert('Email non valide');
    }
}
</script>