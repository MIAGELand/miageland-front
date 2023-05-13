<template>
    <Line
            :options="chartOptions"
            :data="chartData"
    />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import {ref} from "vue";

const props = defineProps({
    data: Array,
    labels: Array,
    type: String,
});

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)
const chartData = ref({
    label: props.labels,
    datasets: [{
        label: 'Nb tickets',
        data: props.data,
        borderWidth: 1,
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
        tension: 0.1
    }]
})

const chartOptions = ref({
    plugins: {
        legend: {
            display: true,
            labels: {
                color: 'white',
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },

        },
    },
})
</script>