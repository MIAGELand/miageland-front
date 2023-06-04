<template>
  <div id="container" class="hidden md:block">
    <nav
      class="h-screen flex flex-col bg-zinc-900 px-4 pt-8 text-white"
      id="navbar"
    >
      <div
        class="flex cursor-pointer pl-2 items-center"
        @click="$router.push('/')"
      >
        <img src="../assets/ppl.svg" alt="miageland" class="h-8 w-8" />
        <span class="ml-4 text-xl font-bold">MIAGELand</span>
      </div>

      <!-- NAV BAR-->
      <div class="flex flex-col items-start mt-8 gap-2">
        <div
          class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
          :class="{ 'bg-gray-700': $route.name === 'ParkAccess' }"
          @click="$router.push({ name: 'ParkAccess' })"
        >
          <img
            src="../assets/tickets.svg"
            alt="attractions"
            class="h-8 w-8 mr-4"
          />
          <button class="font-bold">Acheter billets</button>
        </div>
        <div
          class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
          :class="{ 'bg-gray-700': $route.name === 'VisitorAttraction' }"
          @click="$router.push({ name: 'VisitorAttraction' })"
        >
          <img
            src="../assets/attractions.svg"
            alt="attractions"
            class="h-8 w-8 mr-4"
          />
          <button class="font-bold">Attractions</button>
        </div>
        <div
          class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
          :class="{ 'bg-gray-700': $route.name === 'Reservations' }"
          @click="$router.push({ name: 'Reservations' })"
        >
          <img
            src="../assets/calendar.svg"
            alt="tickets"
            class="h-8 w-8 mr-4"
          />
          <button class="font-bold">Réservations</button>
        </div>
        <div
          class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
          :class="{ 'bg-gray-700': $route.name === 'Profile' }"
          @click="$router.push({ name: 'Profile' })"
        >
          <img
            src="../assets/visitors.svg"
            alt="visitor"
            class="h-8 w-8 mr-4"
          />
          <button class="font-bold">Profil</button>
        </div>
      </div>
      <!-- STICKY ELEMENT BOTTOM NAVBAR -->
      <div class="flex flex-col items-start mt-auto mb-4">
        <div
          class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
          @click="$router.push({ name: 'Home' })"
        >
          <img src="../assets/logout.svg" alt="logout" class="h-8 w-8 mr-2" />
          <button class="font-bold">Se déconnecter</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  logoUrl: String,
});
</script>

<style scoped>
#navbar {
  width: 225px;
}
</style>
