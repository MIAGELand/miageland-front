<template>
  <!-- BIG 404 CENTERED WITH EMOJIS -->
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="text-6xl">🤷‍♂️🤷‍♂️🤷‍♂️</div>
    <h1 class="text-4xl font-bold mt-8">404 - Page non trouvé</h1>
    <h2 class="text-xl mt-6">La page demandée n'existe pas.</h2>
    <div class="flex flex-row mt-8">
      <button
        @click="$router.push({ name: 'Home' })"
        class="bg-gray-700 hover:bg-gray-900 text-white rounded-xl p-3 text-center"
      >
        Accueil
      </button>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
