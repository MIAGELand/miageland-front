<template>
    <form>
        <h1 class="text-2xl font-bold mb-4">{{ props.formData.name }}</h1>
        <div class="grid grid-cols-2">
            <div v-for="(type, field) in props.formData.fields" :key="field" class="flex">
                <div>
                    <label class="block font-medium mb-2 capitalize ">{{ field }}</label>
                    <template v-if="type === 'string'">
                        <input type="text" v-model="formData['fields'][field]" :class="{ 'border-red-500 border-2': errors[field] }" class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </template>
                    <template v-else-if="type === 'Date'">
                        <input type="datetime-local" v-model="formData['fields'][field]" :class="{ 'border-red-500 border-2': errors[field] }" class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </template>
                    <template v-else-if="type.includes('|')">
                        <select v-model="formData['fields'][field]" :class="{ 'border-red-500 border-2': errors[field] }" class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option v-for="option in type.split('|')" :key="option">{{ option }}</option>
                        </select>
                    </template>
                    <template v-else-if="type === 'number'">
                        <input type="number" step="0.01" min="0" v-model="formData['fields'][field]" :class="{ 'border-red-500 border-2': errors[field] }" class="border border-gray-400 text-gray-800 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    </template>
                </div>
            </div>
        </div>
        <button @click.prevent="generateData" class="bg-blue-500 enabled:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-30">Générer</button>
    </form>
</template>

<script setup lang="ts">
import {computed, PropType, reactive} from "vue";
import {FormData} from "../models/models";

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
    fields: {
        ...Object.fromEntries(Object.keys(props.formData.fields).map(key => [key, '']))
    }
})

const errors = reactive({
    ...Object.fromEntries(Object.keys(props.formData.fields).map(key => [key, false]))
})

const generateData = () => {
    // Check if all fields are filled
    let error = false;
    for (const [key, value] of Object.entries(formData.fields)) {
        if (value === '') {
            errors[key] = true
            error = true
        } else {
            errors[key] = false
        }
    }
    if (error) {
        return
    }
    // Add the element name to the form data
    formData['name'] = props.formData.name
    emit('generate-data', formData)
}

</script>