<template>
    <Toaster position="top-right" richColors/>
    <form>
        <h1 class="text-2xl font-bold mb-4">{{ props.formData.name }}</h1>
        <div class="grid grid-cols-2">
            <div v-for="(type, field) in props.formData.data" :key="field" class="flex">
                <div>
                    <label class="block font-medium mb-2 capitalize ">{{ field }}</label>
                    <template v-if="type === 'string'">
                        <input type="text" v-model="formData['data'][field]" :class="{ 'border-red-500 border-2': errors[field] }" class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </template>
                    <template v-if="type === 'email'">
                        <input type="email" v-model="formData['data'][field]" :class="{ 'border-red-500 border-2': errors[field] }" class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </template>
                    <template v-else-if="type === 'Date'">
                        <input type="datetime-local" v-model="formData['data'][field]" :class="{ 'border-red-500 border-2': errors[field] }" class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </template>
                    <template v-else-if="type.includes('|')">
                        <select v-model="formData['data'][field]" :class="{ 'border-red-500 border-2': errors[field] }" class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option v-for="option in type.split('|').map(opt => opt.trim())" :key="option">{{ option }}</option>
                        </select>
                    </template>
                    <template v-else-if="type === 'number'">
                        <input type="number" step="0.01" min="0" v-model="formData['data'][field]" :class="{ 'border-red-500 border-2': errors[field] }" class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </template>
                </div>
            </div>
        </div>
        <button @click.prevent="generateData" class="bg-blue-500 enabled:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Générer</button>
        <input type="number" min="1" v-model="nbData" class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 ml-4 leading-tight w-16 focus:outline-none focus:bg-white focus:border-gray-500" />
        <button @click.prevent="generateRandomData" class="bg-teal-700 enabled:hover:bg-teal-900 text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-50" :disabled="nbData === 0">Générer random</button>
    </form>
</template>

<script setup lang="ts">
import {PropType, reactive, ref} from "vue";
import {FormData} from "../models/models";
import { faker } from '@faker-js/faker';
import { Toaster, toast } from 'vue-sonner';

let nbData = ref(0)

const props = defineProps({
    formData: {
        type: Object as PropType<FormData>,
        required: true
    }
})
const emit = defineEmits(['generate-data'])
const formData: FormData = reactive({
    name: props.formData.name,
    route: props.formData.route,
    data: {
        ...Object.fromEntries(Object.keys(props.formData.data).map(key => [key, '']))
    }
})

const errors = reactive({
    ...Object.fromEntries(Object.keys(props.formData.data).map(key => [key, false]))
})

const generateData = () => {
    // Check if all fields are filled
    let error = false;
    for (const [key, value] of Object.entries(formData.data)) {
        if (value === '') {
            errors[key] = true
            error = true
        } else {
            errors[key] = false
        }
    }
    if (error) {
        toast.error('Remplissez les champs !')

        return
    }
    // Add the element name to the form data
    formData['name'] = props.formData.name
    emit('generate-data', formData)
    // Clear form
    for (const [key, value] of Object.entries(formData.data)) {
        formData.data[key] = ''
    }
}
const generateRandomData = () => {
    const route = props.formData.route;
    const name = props.formData.name;
    const data = [];
    for (let i = 0; i < nbData.value; i++) {
        const fields = {};
        for (const [key, value] of Object.entries(props.formData.data)) {
            if (value === 'string') {
                fields[key] = faker.name.firstName();
            } else if (value === 'email') {
                fields[key] = faker.internet.email();
            }else if (value === 'Date') {
                fields[key] = faker.date.future();
            } else if (value.includes('|')) {
                const options = value.split('|').map(opt => opt.trim());
                fields[key] = options[Math.floor(Math.random() * options.length)];
            } else if (value === 'number') {
                fields[key] = parseFloat(faker.finance.amount());
            }
        }
        data.push(fields);
    }
    emit('generate-data', {
        name,
        route,
        data: Object.assign({}, data)
    });
};


</script>