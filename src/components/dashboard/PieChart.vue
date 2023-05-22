<template>
  <Pie :options="chartOptions" :data="chartData" class="p-2" />
</template>

<script setup lang="ts">
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { ref } from "vue";
import { generatePastelRGB, getDifferentColors } from "../../util/colors";

const props = defineProps({
  data: Array,
  labels: Array,
  type: String,
});

const nbRandomColors = (nb: number) => {
  const colors = [];
  for (let i = 0; i < nb; i++) {
    colors.push(generatePastelRGB());
  }
  return colors;
};

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);
const chartData = ref({
  labels: props.labels,
  datasets: [
    {
      data: props.data,
      borderWidth: 1,
      backgroundColor: getDifferentColors(props.data.length),
    },
  ],
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
});
</script>
