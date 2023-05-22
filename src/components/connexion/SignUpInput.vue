<template>
  <!-- Create a Login input with a button to connect and check email part -->
  <div class="mt-2">
    <div class="flex flex-col justify-center items-center gap-2">
        <input v-model="email" v-on:keydown.enter="signUp" type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-3" placeholder="john.doe@company.com" required>
        <input v-model="name" v-on:keydown.enter="signUp" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-3" placeholder="John" required>
        <input v-model="surname" v-on:keydown.enter="signUp" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-3" placeholder="Doe" required>
    </div>
    <div>
      <button class="bg-teal-600 text-xl text-white font-bold py-2 px-4 rounded-xl mt-4 hover:bg-teal-700 disabled:bg-gray-400"
              @click="signUp"
              :disabled="email === '' || name === '' || surname === ''">
        S'inscrire
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
import {api} from "../../main";

const router = useRouter();

const email = ref('');
const name = ref('');
const surname = ref('');
const signUp = async () => {
  api.post('/visitors', {
    email: email.value,
    name: name.value,
    surname: surname.value,
  }).then((response) => {
    document.cookie = "name=" + response.data.name + ";";
    document.cookie = "surname=" + response.data.surname + ";";
    document.cookie = "id=" + response.data.id + ";";
    document.cookie = "email=" + response.data.email + ";";
    router.push({name: 'ParkAccess'});
  }).catch(() => {
    alert('Champ non valide');
  });
}
</script>