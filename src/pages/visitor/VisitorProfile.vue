<template>
  <Toaster />
  <div class="flex">
    <VerticalVisitor />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-bold">
        <img
          src="../../assets/visitors.svg"
          alt="visitor"
          class="h-8 w-8 mr-4"
        />
        {{ title }}
      </div>

      <!-- RESERVATIONS -->
      <div class="m-8 flex flex-col gap-4">
        <div v-if="!isLoading">
          <visitor-profile-card :visitor="visitor" />
          <button
            class="bg-red-700 enabled:hover:bg-red-900 text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-50"
            @click="deleteAccount"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalVisitor from "../../layouts/VerticalVisitor.vue";
import { useVisitor } from "../../queries/visitor.query";
import { getCookie } from "../../util/cookie";
import { computed, ref } from "vue";
import VisitorProfileCard from "../../components/visitor/VisitorProfileCard.vue";
import { deleteVisitor } from "../../service/visitor-service";
import { useRouter } from "vue-router";
import { toast, Toaster } from "vue-sonner";
const router = useRouter();
const title = "Profil";
const logoUrl = "../../assets/visitors.svg";

const name = computed(() => getCookie("name"));
const surname = computed(() => getCookie("surname"));
const email = computed(() => getCookie("email"));
const { data: visitor, isLoading } = useVisitor(email);
const id = computed(() => getCookie("id"));
const deleteAccount = () => {
  if (confirm("Voulez-vous vraiment supprimer votre compte ?")) {
    deleteVisitor(Number(id.value))
      .then(() => {
        router.push({ name: "Home" });
      })
      .catch((e) => {
        toast.error("Erreur lors de la suppression du compte");
      });
  }
};
</script>

<style scoped></style>
