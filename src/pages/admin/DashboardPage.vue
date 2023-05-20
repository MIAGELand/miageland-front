<template>
    <div class="flex">
        <vertical-navbar :title="title" :logoUrl="logoUrl"/>
        <div class="flex flex-col h-screen w-screen md:overflow-auto">
            <!-- TITLE -->
            <div class="flex ml-8 mt-8 text-3xl font-bold">
                <img :src="logoUrl" alt="locker" class="h-8 w-8 mr-4" />
                {{ title }}
            </div>

            <!-- EMPLOYEES -->
            <div class="m-8 flex" v-if="isManager">
                <span v-if="isLoading">
                    Loading...
                </span>
                <div v-else class="flex flex-col gap-12 w-full">
                    <div class="flex flex-col gap-4">
                        <div class="text-2xl">
                            🧮 Global
                        </div>
                        <div class="flex flex-wrap gap-4">
                            <card-container emoji="👨‍🔧" title="Employés" class="flex flex-col gap-2 grow">
                                <div class="flex items-baseline gap-2 justify-center">
                                    <NumberElement :data="nbEmployeeTotal" title="Total" size="lg"/>
                                </div>
                                <hr>
                                <div class="flex gap-2 items-end justify-between">
                                    <NumberElement :data="nbEmployeeAdmin" title="Admins" size="md"/>
                                    <NumberElement :data="nbEmployeeClassic" title="Classiques" size="md"/>
                                </div>
                            </card-container>
                            <card-container emoji="🎢" title="Attractions" class="flex flex-col gap-2 grow">
                                <div class="flex items-baseline gap-2 justify-center">
                                    <NumberElement :data="nbAttractionTotal" title="Total" size="lg"/>
                                </div>
                                <hr>
                                <div class="flex gap-2 items-end justify-between">
                                    <NumberElement :data="nbAttractionOpened" title="Ouvertes" size="md"/>
                                    <NumberElement :data="nbAttractionClosed" title="Fermées" size="md"/>
                                </div>
                            </card-container>
                            <card-container emoji="🎟️" title="Billets" class="flex flex-col gap-2 grow">
                                <div class="flex items-baseline gap-2 justify-center">
                                    <NumberElement :data="nbTicketTotal" title="Total" size="lg"/>
                                </div>
                                <hr>
                                <div class="flex gap-2 items-end justify-between">
                                    <NumberElement :data="nbTicketPaid" title="Payés" size="md"/>
                                    <NumberElement :data="nbTicketUsed" title="Utilisés" size="md"/>
                                    <NumberElement :data="nbTicketCancelled" title="Annulés" size="md"/>
                                </div>
                            </card-container>

                        </div>
                    </div>

                    <div class="flex flex-col gap-4">
                        <div class="text-2xl">
                            📊 Graphiques
                        </div>
                        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            <card-container emoji="👨‍🔧" title="Employés" class="flex flex-col gap-2">
                                <PieChart :data="employeeNumberList" :labels="employeeNameList"/>
                            </card-container>
                            <card-container emoji="🎢" title="Attractions" class="flex flex-col gap-2">
                                <PieChart :data="attractionNumberList" :labels="attractionNameList"/>
                            </card-container>
                            <card-container emoji="🎟️" title="Billets" class="flex flex-col gap-2">
                                <PieChart :data="ticketNumberList" :labels="ticketNameList"/>
                            </card-container>
                        </div>
                    </div>

                    <div class="flex flex-col gap-4">
                        <div class="text-2xl">
                            🕙 Timeline
                        </div>

                        <div class="w-full">
                            <card-container emoji="📊" title="Nb tickets / mois" class="flex flex-col gap-2 w-full">
                                <BarChart :data="ticketNumberByMonthAndYear" :labels="ticketDateLabels" lineLabel="Nb tickets / mois"/>
                            </card-container>
                        </div>

                        <div class="w-full">
                            <card-container emoji="📊" title="Bénéfices / mois" class="flex flex-col gap-2 w-full">
                                <LineChart :data="benefitsByMonthAndYear" :labels="ticketDateLabels" lineLabel="Bénéfices / mois"/>
                            </card-container>
                        </div>
                    </div>
                </div>
            </div>
            <unauthorized-info v-else/>
        </div>
    </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../../layouts/VerticalNavbar.vue";
import {useEmployeeList, useEmployeeStats} from "../../queries/employee.query";
import CardContainer from "../../components/dashboard/CardContainer.vue";
import {useAttractionStats} from "../../queries/attraction.query";
import {computed} from "vue";
import {useTicketStats} from "../../queries/ticket.query";
import NumberElement from "../../components/dashboard/NumberElement.vue";
import PieChart from "../../components/dashboard/PieChart.vue";
import LineChart from "../../components/dashboard/LineChart.vue";
import {createDateFromMMYY, } from "../../util/date";
import BarChart from "../../components/dashboard/BarChart.vue";
import {getCookie} from "../../util/cookie";
import UnauthorizedInfo from "../../components/UnauthorizedInfo.vue";

const title = "Dashboard";
const logoUrl = "src/assets/dashboard.svg";

const { data: attractionStats, isLoading: attractionStatsLoading } = useAttractionStats();
const { data: employeeStats, isLoading: employeeStatsLoading } = useEmployeeStats();
const { data: ticketStats, isLoading: ticketStatsLoading } = useTicketStats();
const { data: employeeList } = useEmployeeList();

// Check if employee is manager
const isManager = computed(() => {
  const employeeMail = getCookie("email")
  return employeeList.value?.find((employee) => employee.email === employeeMail)?.role === "MANAGER";
});

const isLoading = computed(() => {
  return attractionStatsLoading.value || employeeStatsLoading.value || ticketStatsLoading.value;
});

// when loaded, filter the data to get the number of employees, attractions and tickets
const nbEmployeeTotal = computed(() => {
    return employeeStats.value?.nbTotal;
});

const nbEmployeeAdmin = computed(() => {
    return employeeStats.value?.nbAdmin;
});

const nbEmployeeClassic = computed(() => {
    return employeeStats.value?.nbClassic;
});

const nbAttractionTotal = computed(() => {
  return attractionStats.value?.nbTotal;
});

const nbAttractionOpened = computed(() => {
  return attractionStats.value?.nbOpened;
});

const nbAttractionClosed = computed(() => {
  return attractionStats.value?.nbClosed;
});

const numberStatsTicket = computed(() => {
  return ticketStats.value?.numberStatsTicket;
});

const monthlyTicketInfos = computed(() => {
  return ticketStats.value?.monthlyTicketInfos;
});

const nbTicketTotal = computed(() => {
  return numberStatsTicket.value.nbTotal;
});

const nbTicketPaid = computed(() => {
  return numberStatsTicket.value.nbPaid;
});

const nbTicketUsed = computed(() => {
  return numberStatsTicket.value.nbUsed;
});

const nbTicketCancelled = computed(() => {
  return numberStatsTicket.value.nbCancelled;
});

const employeeNumberList = computed(() => {
    return [nbEmployeeAdmin, nbEmployeeClassic];
});

const employeeNameList = computed(() => {
    return ['Admins', 'Classiques'];
});

const attractionNumberList = computed(() => {
    return [nbAttractionOpened, nbAttractionClosed];
});

const attractionNameList = computed(() => {
    return ['Ouvertes', 'Fermées'];
});

const ticketNumberList = computed(() => {
    return [nbTicketPaid, nbTicketUsed, nbTicketCancelled];
});

const ticketNameList = computed(() => {
    return ['Payés', 'Utilisés', 'Annulés'];
});

const firstTicketDate = computed(() => {
  if (monthlyTicketInfos && monthlyTicketInfos.value.length > 0) {
    const minDate = monthlyTicketInfos.value.reduce((min, p) => {
      const currentDate = createDateFromMMYY(p.monthYear);
      return currentDate < min ? currentDate : min;
    }, createDateFromMMYY(monthlyTicketInfos.value[0].monthYear));

    // Format minDate as "MM/YY"
    return new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  }

  return null;
});

const lastTicketDate = computed(() => {
  if (monthlyTicketInfos && monthlyTicketInfos.value.length > 0) {
    const maxDate = monthlyTicketInfos.value.reduce((max, p) => {
      const currentDate = createDateFromMMYY(p.monthYear);
      return currentDate > max ? currentDate : max;
    }, createDateFromMMYY(monthlyTicketInfos.value[0].monthYear));

    // Format maxDate as "MM/YY"
    return new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
  }

  return null;
});

// This function iterates on monthly tickets infos and for each value it inserts the date with MM/YY format
// return an array of labels with the monthYear format "MM/YY"
const ticketDateLabels = computed<string[]>(() => {
  if (monthlyTicketInfos && monthlyTicketInfos.value.length > 0) {
    const sortedTickets = [...monthlyTicketInfos.value].sort((a, b) => {
      // Assuming monthYear is in the format "MM/YY"
      const [aMonth, aYear] = a.monthYear.split('/');
      const [bMonth, bYear] = b.monthYear.split('/');
      const aDate = new Date(Number(`20${aYear}`), parseInt(aMonth) - 1);
      const bDate = new Date(Number(`20${bYear}`), parseInt(bMonth) - 1);
      return aDate.getTime() - bDate.getTime();
    });
    return sortedTickets.map((ticketInfo) => ticketInfo.monthYear);
  }
  return [];
});



const ticketNumberByMonthAndYear = computed(() => {
    const ticketListPaidByMonthAndYear = ticketDateLabels.value.map((monthYear) => {
      const ticketInfo = monthlyTicketInfos.value.find((ticketInfo) => ticketInfo.monthYear === monthYear);
      return ticketInfo ? ticketInfo.numberStatsTicket.nbPaid : 0;
    });

    const ticketListUsedByMonthAndYear = ticketDateLabels.value.map((monthYear) => {
      const ticketInfo = monthlyTicketInfos.value.find((ticketInfo) => ticketInfo.monthYear === monthYear);
      return ticketInfo ? ticketInfo.numberStatsTicket.nbUsed : 0;
    });

    const ticketListCancelledByMonthAndYear = ticketDateLabels.value.map((monthYear) => {
      const ticketInfo = monthlyTicketInfos.value.find((ticketInfo) => ticketInfo.monthYear === monthYear);
      return ticketInfo ? ticketInfo.numberStatsTicket.nbCancelled : 0;
    });

    return [
        {
            label: 'Payés',
            data: ticketListPaidByMonthAndYear,
        },
        {
            label: 'Utilisés',
            data: ticketListUsedByMonthAndYear,
        },
        {
            label: 'Annulés',
            data: ticketListCancelledByMonthAndYear,
        }
    ];
});

const benefitsByMonthAndYear = computed(() => {
  return ticketDateLabels.value.map((monthYear) => {
    const ticketInfo = monthlyTicketInfos.value.find((ticketInfo) => ticketInfo.monthYear === monthYear);
    return ticketInfo ? ticketInfo.benefits : 0;
  });
});

</script>

<style scoped>
</style>
