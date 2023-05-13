<template>
    <Line :options="chartOptions" :data="chartData" />
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
import { ref } from 'vue'

const props = defineProps({
    data: Array,
    labels: Array,
    lineLabel: String,
    type: String
})

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

const chartData = ref({
    labels: props.labels,
    datasets: [
        {
            label: props.lineLabel,
            data: props.data,
            borderWidth: 4,
            pointRadius: 12,
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            tension: 0.1
        }
    ]
})

const chartOptions = ref({
    plugins: {
        legend: {
            display: true,
            labels: {
                color: 'white',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(255,255,255,0.1)',
                borderColor: 'white'
            },
            ticks: {
                color: 'white',
                font: {
                    size: 14
                }
            }
        },
        y: {
            grid: {
                color: 'rgba(255,255,255,0.1)',
                borderColor: 'white'
            },
            ticks: {
                color: 'white',
                font: {
                    size: 14
                }
            }
        },
        color: 'white'
    }
})
</script>
