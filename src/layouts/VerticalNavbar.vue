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
          label="Employés"
          routeName="Employees"
          :isActive="$route.name === 'Employees'"
        >
          <img src="/src/assets/employees.svg" :alt="label" class="h-8 w-8 mr-4"/>
        </VerticalNavbarItem>
        <VerticalNavbarItem
          label="Attractions"
          routeName="Attractions"
          :isActive="$route.name === 'Attractions'"
        >
          <img src="/src/assets/attractions.svg" :alt="label" class="h-8 w-8 mr-4"/>
        </VerticalNavbarItem>
        <VerticalNavbarItem
          label="Tickets"
          routeName="Tickets"
          :isActive="$route.name === 'Tickets'"
        >
          <img src="/src/assets/tickets.svg" :alt="label" class="h-8 w-8 mr-4"/>
        </VerticalNavbarItem>
        <VerticalNavbarItem
          label="Visiteurs"
          iconUrl="../../assets/visitors.svg"
          routeName="Visitors"
          :isActive="$route.name === 'Visitors'"
        >
          <img src="/src/assets/visitors.svg" :alt="label" class="h-8 w-8 mr-4"/>
        </VerticalNavbarItem>
        <VerticalNavbarItem
          label="Parc"
          routeName="Park"
          :isActive="$route.name === 'Park'"
        >
          <img src="/src/assets/park.svg" :alt="label" class="h-8 w-8 mr-4"/>
        </VerticalNavbarItem>
        <VerticalNavbarItem
          label="Dashboard"
          routeName="Dashboard"
          :isActive="$route.name === 'Dashboard'"
        >
          <img src="/src/assets/dashboard.svg" :alt="label" class="h-8 w-8 mr-4"/>
        </VerticalNavbarItem>

        <div class="w-full my-2">
          <hr class="border-white" />
        </div>

        <VerticalNavbarItem
          label="Générateur"
          iconUrl="../../assets/generator.svg"
          routeName="Generator"
          :isActive="$route.name === 'Generator'"
        >
          <img src="/src/assets/generator.svg" :alt="label" class="h-8 w-8 mr-4"/>
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
            <div>{{ employeeName }}</div>
            <div class="text-gray-400">{{ employeeRole }}</div>
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
import { useEmployeeList } from "../queries/employee.query";
import { computed } from "vue";
import { getCookie } from "../util/cookie";
import VerticalNavbarItem from "../components/navigation/VerticalNavbarItem.vue";

const { data: employeeList } = useEmployeeList();
const emailFromCookie = computed(() => {
  return getCookie("email");
});

const employeeName = computed(() => {
  if (employeeList.value) {
    const employee = employeeList.value?.find(
      (employee) => employee.email === emailFromCookie.value
    );
    if (employee) {
      return employee.name;
    }
  }
  return "";
});

const employeeRole = computed(() => {
  if (employeeList.value) {
    const employee = employeeList.value?.find(
      (employee) => employee.email === emailFromCookie.value
    );
    if (employee) {
      return employee.role;
    }
  }
  return "";
});

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
