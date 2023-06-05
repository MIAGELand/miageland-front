<template>
  <div class="flex">
    <vertical-navbar />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-semibold">
        <img
          src="../../assets/generator.svg"
          alt="locker"
          class="h-8 w-8 mr-4"
        />
        {{ title }}
      </div>

      <!-- GENERATORS -->
      <div class="m-8 flex flex-col">
        <generator-navigation @nav="updatePage" :active="page" class="mb-4" />
        <div v-for="element in elements">
          <generator-form
            v-if="page === element.route"
            :formData="element"
            @generateData="generateData"
          ></generator-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../../layouts/VerticalNavbar.vue";
import GeneratorForm from "../../components/generator/GeneratorForm.vue";
import { BASE_URL } from "../../util/constants";
import { FormData } from "../../models/models";
import { toast } from "vue-sonner";
import { api } from "../../main";
import { getCookie } from "../../util/cookie";
import GeneratorNavigation from "../../components/generator/GeneratorNavigation.vue";
import { ref } from "vue";

const title = "Générateur";

const page = ref("employees");
const updatePage = (nav) => {
  page.value = nav;
};

let elements = [
  {
    name: "👨‍🔧 Employés",
    route: "employees",
    data: {
      name: "string",
      surname: "string",
      email: "email",
      role: "ADMIN | CLASSIC",
    },
  },
  {
    name: "🎢 Attractions",
    route: "attractions",
    data: {
      name: "string",
      opened: "boolean",
    },
  },
  {
    name: "🎟️ Tickets",
    route: "tickets",
    data: {
      name: "string",
      surname: "string",
      email: "email",
      date: "Date",
      price: "number",
    },
  },
  {
    name: "👨‍👩‍👧 Visitors",
    route: "visitors",
    data: {
      name: "string",
      surname: "string",
      email: "email",
    },
  },
];

const generateData = async (formData: FormData) => {
  let url = BASE_URL + "/" + formData.route;
  let data = formData.data;
  const email = getCookie("email");
  toast.message("Génération des données en cours...");
  await api
    .post(url, data, {
      headers: {
        Authorization: `email=${email}`,
      },
    })
    .then(() => {
      toast.success(
        Object.keys(data).length +
          " ligne(s) `" +
          formData.name +
          "` générée(s) avec succès !"
      );
    })
    .catch((error) => {
      toast.error("Erreur lors de la génération des données");
    });
};
</script>

<style scoped></style>
