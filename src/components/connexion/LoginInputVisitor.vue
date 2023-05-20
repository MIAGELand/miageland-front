<template>
  <div class="mt-2">
    <div class="flex flex-col gap-2 justify-center">
      <input v-model="name" v-on:keydown.enter="connect" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-3" placeholder="John" required>
      <input v-model="surname" v-on:keydown.enter="connect" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-3" placeholder="Doe" required>
    </div>
    <div>
      <button class="bg-teal-600 text-xl text-white font-bold py-2 px-4 rounded-xl mt-4 hover:bg-teal-700 disabled:bg-gray-400"
              @click="connect"
              :disabled="name === '' || surname === ''">
        Se connecter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter} from "vue-router";
import {api} from "../../main";
const router = useRouter();
const name = ref('');
const surname = ref('');
const connect = async () => {
  api.get(`/visitors?name=${name.value}&surname=${surname.value}`).then((data) => {
    document.cookie = "id=" + data.data.id + ";";
    router.push({name: 'ParkAccess'});
  }).catch(() => {
    alert('Nom / Prénom non valides');
  });
}
</script>