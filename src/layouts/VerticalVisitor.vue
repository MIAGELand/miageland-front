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
        <img src="src/assets/ppl.svg" alt="miageland" class="h-8 w-8" />
        <span class="ml-4 text-xl">MIAGELand</span>
      </div>

      <!-- NAV BAR-->
      <div class="flex flex-col items-start mt-8 gap-2">
        <VerticalNavbarItem
          label="Acheter billets"
          iconUrl="src/assets/tickets.svg"
          routeName="ParkAccess"
          :isActive="$route.name === 'ParkAccess'"
        />
        <VerticalNavbarItem
          label="Attractions"
          iconUrl="src/assets/attractions.svg"
          routeName="VisitorAttraction"
          :isActive="$route.name === 'VisitorAttraction'"
        />
        <VerticalNavbarItem
          label="Réservations"
          iconUrl="src/assets/calendar.svg"
          routeName="Reservations"
          :isActive="$route.name === 'Reservations'"
        />
        <VerticalNavbarItem
          label="Profil"
          iconUrl="src/assets/visitors.svg"
          routeName="Profile"
          :isActive="$route.name === 'Profile'"
        />
      </div>

      <!-- STICKY ELEMENT BOTTOM NAVBAR -->
      <div class="flex flex-col items-start mt-auto mb-4">
        <VerticalNavbarItem
          label="Se déconnecter"
          iconUrl="src/assets/logout.svg"
          routeName="Home"
        />
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import VerticalNavbarItem from "../components/navigation/VerticalNavbarItem.vue";

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
