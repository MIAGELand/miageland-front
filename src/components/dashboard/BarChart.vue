<template>
  <Bar :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ref } from "vue";
import { getDifferentColors, getRandomColor } from "../../util/colors";

const props = defineProps({
  data: Array,
  labels: Array,
  lineLabel: String,
  type: String,
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const colors = getDifferentColors(props.data.length);
const chartData = ref({
  labels: props.labels,
  datasets: props.data.map((data: any) => {
    return {
      label: data.label,
      data: data.data,
      backgroundColor: colors.pop(),
      borderWidth: 2,
      borderColor: "white",
    };
  }),
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "white",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        color: "rgba(255,255,255,0.1)",
        borderColor: "white",
      },
      ticks: {
        color: "white",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    y: {
      stacked: true,
      grid: {
        color: "rgba(255,255,255,0.1)",
        borderColor: "white",
      },
      ticks: {
        color: "white",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
  },
});
</script>
