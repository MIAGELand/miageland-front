<template>
    <div class="flex">
        <vertical-navbar :title="title" :logoUrl="logoUrl"/>
        <div class="flex flex-col h-screen w-screen md:overflow-auto">
            <!-- TITLE -->
            <div class="flex ml-8 mt-8 text-3xl font-bold">
                <img :src="logoUrl" alt="locker" class="h-8 w-8 mr-4" />
                {{ title }}
            </div>

            <!-- GENERATORS -->
            <div class="m-8 flex flex-col gap-4">
                <div v-for="element in elements" class="bg-slate-600 p-4 rounded-lg shadow-xl hover:bg-gray-700 transition">
                    <generator-form :formData="element" @generateData="generateData"></generator-form>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../layouts/VerticalNavbar.vue";
import GeneratorForm from "../components/generator/GeneratorForm.vue";
import {BASE_URL} from "../util/constants";
import {FormData} from "../models/models";
import {toast} from "vue-sonner";
import {api} from "../main";

const title = "Générateur";
const logoUrl = "src/assets/generator.svg";

let elements = [
    {
        "name": "👨‍🔧 Employés",
        "route": "employees",
        "data": {
            "name": "string",
            "surname": "string",
            "email": "email",
            "role": "ADMIN | CLASSIC",
        },
    },
    {
        "name": "🎢 Attractions",
        "route": "attractions",
        "data": {
            "name": "string",
            "opened": "boolean",
        }
    },
    {
        "name": "🎟️ Tickets",
        "route": "tickets",
        "data": {
            "name": "string",
            "surname": "string",
            "date": "Date",
            "price": "number"
        }
    }
]

const generateData = async (formData: FormData) => {
    let url = BASE_URL + "/" + formData.route;
    let data = formData.data;
    toast.message('Génération des données en cours...')
    await api.post(url, data).then(() => {
        toast.success(Object.keys(data).length + ' ligne(s) `' + formData.name + '` générée(s) avec succès !')
    }).catch((error) => {
        toast.error('Erreur lors de la génération des données')
    });
}
</script>

<style scoped>
</style>
