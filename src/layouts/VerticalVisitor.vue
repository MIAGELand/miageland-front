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
        <img src="/src/assets/ppl.svg" alt="miageland" class="h-8 w-8" />
        <span class="ml-4 text-xl">MIAGELand</span>
      </div>

      <!-- NAV BAR-->
      <div class="flex flex-col items-start mt-8 gap-2">
        <VerticalNavbarItem
          label="Acheter billets"
          routeName="ParkAccess"
          :isActive="$route.name === 'ParkAccess'"
        >
          <img src="/src/assets/tickets.svg" :alt="label" class="h-8 w-8 mr-4"/>
        </VerticalNavbarItem>
        <VerticalNavbarItem
          label="Attractions"
          routeName="VisitorAttraction"
          :isActive="$route.name === 'VisitorAttraction'"
        >
          <img src="/src/assets/attractions.svg" :alt="label" class="h-8 w-8 mr-4"/>
        </VerticalNavbarItem>
        <VerticalNavbarItem
          label="Réservations"
          routeName="Reservations"
          :isActive="$route.name === 'Reservations'"
        >
          <img src="/src/assets/calendar.svg" :alt="label" class="h-8 w-8 mr-4"/>
        </VerticalNavbarItem>

        <VerticalNavbarItem
          label="Profil"
          routeName="Profile"
          :isActive="$route.name === 'Profile'"
        >
          <img src="/src/assets/visitors.svg" :alt="label" class="h-8 w-8 mr-4"/>
        </VerticalNavbarItem>

      </div>

      <!-- STICKY ELEMENT BOTTOM NAVBAR -->
      <div class="flex flex-col items-start mt-auto mb-4">
        <div class="flex py-2 items-center gap-4">
          <img
            src="/src/assets/vue.svg"
            alt="profile"
            class="h-8 w-8 pl-2 mr-2"
          />
          <div class="flex flex-col gap-0.5">
            <div>{{ visitorName }}</div>
          </div>
        </div>
        <VerticalNavbarItem
          label="Se déconnecter"
          routeName="Home"
        >
          <img src="/src/assets/logout.svg" :alt="label" class="h-8 w-8 mr-4"/>
        </VerticalNavbarItem>

      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import VerticalNavbarItem from "../components/navigation/VerticalNavbarItem.vue";
import { computed } from "vue";
import { getCookie } from "../util/cookie";

defineProps({
  title: String,
  logoUrl: String,
});

const visitorName = computed(() => getCookie("name"));
</script>

<style scoped>
#navbar {
  width: 225px;
}
</style>
