<template>
  <div class="flex">
    <vertical-navbar :title="title" :logoUrl="logoUrl" />
    <div class="flex flex-col h-screen w-screen md:overflow-auto">
      <!-- TITLE -->
      <div class="flex ml-8 mt-8 text-3xl font-bold">
        <img :src="logoUrl" alt="locker" class="h-8 w-8 mr-4" />
        {{ title }}
      </div>

      <!-- EMPLOYEES -->
      <div class="m-8 flex" v-if="isManager">
        <span v-if="isLoading"> Loading... </span>
        <div v-else class="flex flex-col gap-8 w-full">
          <DashboardNavigation @nav="updatePage" :active="page"/>
          <div v-if="page === 'global'" class="flex flex-col gap-4">
            <div class="text-2xl">🧮 Global</div>
            <div class="flex flex-wrap gap-4">
              <card-container
                emoji="👨‍🔧"
                title="Employés"
                class="flex flex-col gap-2 grow"
              >
                <div class="flex items-baseline gap-2 justify-center">
                  <NumberElement
                    :data="nbEmployeeTotal"
                    title="Total"
                    size="lg"
                  />
                </div>
                <hr />
                <div class="flex gap-2 items-end justify-between">
                  <NumberElement
                    :data="nbEmployeeAdmin"
                    title="Admins"
                    size="md"
                  />
                  <NumberElement
                    :data="nbEmployeeClassic"
                    title="Classiques"
                    size="md"
                  />
                </div>
              </card-container>
              <card-container
                emoji="🎢"
                title="Attractions"
                class="flex flex-col gap-2 grow"
              >
                <div class="flex items-baseline gap-2 justify-center">
                  <NumberElement
                    :data="nbAttractionTotal"
                    title="Total"
                    size="lg"
                  />
                </div>
                <hr />
                <div class="flex gap-2 items-end justify-between">
                  <NumberElement
                    :data="nbAttractionOpened"
                    title="Ouvertes"
                    size="md"
                  />
                  <NumberElement
                    :data="nbAttractionClosed"
                    title="Fermées"
                    size="md"
                  />
                </div>
              </card-container>
              <card-container
                emoji="🎟️"
                title="Billets"
                class="flex flex-col gap-2 grow"
              >
                <div class="flex items-baseline gap-2 justify-center">
                  <NumberElement
                    :data="nbTicketTotal"
                    title="Total"
                    size="lg"
                  />
                </div>
                <hr />
                <div class="flex gap-2 items-end justify-between">
                  <NumberElement
                    :data="nbTicketReserved"
                    title="Réservés"
                    size="md"
                  />
                  <NumberElement :data="nbTicketPaid" title="Payés" size="md" />
                  <NumberElement
                    :data="nbTicketUsed"
                    title="Utilisés"
                    size="md"
                  />
                  <NumberElement
                    :data="nbTicketCancelled"
                    title="Annulés"
                    size="md"
                  />
                </div>
              </card-container>
            </div>
          </div>

          <div class="flex flex-col gap-4" v-if="page === 'graph'">
            <div class="text-2xl">📊 Graphiques</div>
            <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <card-container
                emoji="👨‍🔧"
                title="Employés"
                class="flex flex-col gap-2"
              >
                <PieChart
                  :data="employeeNumberList"
                  :labels="employeeNameList"
                />
              </card-container>
              <card-container
                emoji="🎢"
                title="Attractions"
                class="flex flex-col gap-2"
              >
                <PieChart
                  :data="attractionNumberList"
                  :labels="attractionNameList"
                />
              </card-container>
              <card-container
                emoji="🎟️"
                title="Billets"
                class="flex flex-col gap-2"
              >
                <PieChart :data="ticketNumberList" :labels="ticketNameList" />
              </card-container>
            </div>
          </div>

          <div class="flex flex-col gap-4" v-if="page === 'timeline'">
            <div class="flex justify-between">
              <div class="text-2xl">🕙 Timeline</div>
              <div class="flex flex-col gap-1">
                <DateFilter @updateRange="filterDays"/>
                <span class="flex gap-2 justify-between">
                  <span>From :</span>  <span>{{ startDate }}</span>
                </span>
                <span class="flex gap-2 justify-between">
                  <span>To :</span>  <span>{{ endDate }}</span>
                </span>
              </div>
            </div>

            <div class="w-full">
              <card-container
                emoji="📊"
                title="Nb tickets / mois"
                class="flex flex-col gap-2 w-full"
              >
                <BarChart
                  v-if="!ticketsStatsRangeLoading"
                  :data="dataListNumberByMonthAndYear"
                  :labels="ticketMonthDateLabels"
                  lineLabel="Nb tickets / mois"
                />
              </card-container>
            </div>

            <div class="w-full">
              <card-container
                  emoji="📊"
                  title="Nb tickets / jours"
                  class="flex flex-col gap-2 w-full"
                  @filterRange="filterDays"
              >
                <BarChart
                    v-if="!ticketsStatsRangeLoading"
                    :data="dataListNumberByDay"
                    :labels="ticketDayDateLabels"
                    lineLabel="Nb tickets / jours"
                />
                <BarChart
                    v-else
                    :data="[]"
                    :labels="[]"
                    lineLabel="Nb tickets / jours"
                />
              </card-container>
            </div>

            <div class="w-full">
              <card-container
                emoji="📊"
                title="Bénéfices / mois"
                class="flex flex-col gap-2 w-full"
              >
                <LineChart
                  v-if="!ticketsStatsRangeLoading"
                  :data="dataListBenefitsByMonthAndYear"
                  :labels="ticketMonthDateLabels"
                  lineLabel="Bénéfices / mois"
                />
              </card-container>
            </div>
          </div>
        </div>
      </div>
      <unauthorized-info v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalNavbar from "../../layouts/VerticalNavbar.vue";
import {
  useEmployeeList,
  useEmployeeStats,
} from "../../queries/employee.query";
import CardContainer from "../../components/dashboard/CardContainer.vue";
import { useAttractionStats } from "../../queries/attraction.query";
import {computed, ref} from "vue";
import {useTicketStats, useTicketStatsByDateRange} from "../../queries/ticket.query";
import NumberElement from "../../components/dashboard/NumberElement.vue";
import PieChart from "../../components/dashboard/PieChart.vue";
import LineChart from "../../components/dashboard/LineChart.vue";
import {
  createDateFromYYYYMM,
  createDateFromYYYYMMDD,
  getTicketNumberByDay,
  getTicketNumberByMonthAndYear
} from "../../util/date";
import BarChart from "../../components/dashboard/BarChart.vue";
import { getCookie } from "../../util/cookie";
import UnauthorizedInfo from "../../components/UnauthorizedInfo.vue";
import moment from "moment"
import DashboardNavigation from "../../components/dashboard/DashboardNavigation.vue";
import DateFilter from "../../components/dashboard/DateFilter.vue";

const title = "Dashboard";
const logoUrl = "src/assets/dashboard.svg";

// init start date at the beginning of the month and end date at the end of year
const startDate = ref(moment().startOf('month').format("YYYY-MM-DD"));
const endDate = ref(moment().endOf('year').format("YYYY-MM-DD"));
const { data: attractionStats, isLoading: attractionStatsLoading } =
  useAttractionStats();
const { data: employeeStats, isLoading: employeeStatsLoading } =
  useEmployeeStats();
const { data: ticketStats, isLoading: ticketStatsLoading } = useTicketStats();
const { data: employeeList } = useEmployeeList();
const { data: ticketsStatsByRange, isLoading: ticketsStatsRangeLoading} = useTicketStatsByDateRange(startDate, endDate);
const page = ref("global")
const updatePage = (nav) => {
    page.value = nav
}

// Check if employee is manager
const isManager = computed(() => {
  const employeeMail = getCookie("email");
  return (
    employeeList.value?.find((employee) => employee.email === employeeMail)
      ?.role === "MANAGER"
  );
});

const isLoading = computed(() => {
  return (
    attractionStatsLoading.value ||
    employeeStatsLoading.value ||
    ticketStatsLoading.value
  );
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
  return ticketsStatsByRange.value?.monthlyTicketInfos;
});

const dailyTicketInfos = computed(() => {
  return ticketsStatsByRange.value?.dailyTicketInfos;
});

const nbTicketTotal = computed(() => {
  return numberStatsTicket.value.nbTotal;
});

const nbTicketReserved = computed(() => {
  return numberStatsTicket.value.nbReserved;
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
  return ["Admins", "Classiques"];
});

const attractionNumberList = computed(() => {
  return [nbAttractionOpened, nbAttractionClosed];
});

const attractionNameList = computed(() => {
  return ["Ouvertes", "Fermées"];
});

const ticketNumberList = computed(() => {
  return [nbTicketReserved, nbTicketPaid, nbTicketUsed, nbTicketCancelled];
});

const ticketNameList = computed(() => {
  return ["Réservés", "Payés", "Utilisés", "Annulés"];
});

const firstTicketMonthDate = computed(() => {
  if (monthlyTicketInfos && monthlyTicketInfos.value.length > 0) {
    return monthlyTicketInfos.value.reduce((min, p) => {
      const currentDate = createDateFromYYYYMM(p.monthYear);
      return currentDate < min ? currentDate : min;
    }, new Date());
  }
  return null;
});

const lastTicketMonthDate = computed(() => {
  if (monthlyTicketInfos && monthlyTicketInfos.value.length > 0) {
    return monthlyTicketInfos.value.reduce((max, p) => {
      const currentDate = createDateFromYYYYMM(p.monthYear);
      return currentDate > max ? currentDate : max;
    }, new Date());
  }
  return null;
});

// Return a sorted list of all the months between the first and last ticket date
// Format : MM-YYYY
const ticketMonthDateLabels = computed<string[]>(() => {
  const dateLabels: string[] = [];
  if (firstTicketMonthDate.value && lastTicketMonthDate.value) {
    let currentDate = new Date(firstTicketMonthDate.value);
    while (currentDate <= lastTicketMonthDate.value) {
      // MM-YYYY
      const formattedDate = currentDate.toLocaleString("fr-FR", {
        month: "2-digit",
        year: "numeric",
      });
      dateLabels.push(formattedDate);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }
  return dateLabels;
});

const dataListNumberByMonthAndYear = computed(() => {

  const ticketListNbReservedByMonthAndYear = ticketMonthDateLabels.value.map((monthYear) =>
      getTicketNumberByMonthAndYear(monthYear, monthlyTicketInfos.value, 'nbReserved')
  );

  const ticketListNbPaidByMonthAndYear = ticketMonthDateLabels.value.map((monthYear) =>
      getTicketNumberByMonthAndYear(monthYear, monthlyTicketInfos.value, 'nbPaid')
  );

  const ticketListNbUsedByMonthAndYear = ticketMonthDateLabels.value.map((monthYear) =>
      getTicketNumberByMonthAndYear(monthYear, monthlyTicketInfos.value, 'nbUsed')
  );

  const ticketListNbCancelledByMonthAndYear = ticketMonthDateLabels.value.map((monthYear) =>
      getTicketNumberByMonthAndYear(monthYear, monthlyTicketInfos.value, 'nbCancelled')
  );
  return [
    {
      label: "Réservés",
      data: ticketListNbReservedByMonthAndYear,
    },
    {
      label: "Payés",
      data: ticketListNbPaidByMonthAndYear,
    },
    {
      label: "Utilisés",
      data: ticketListNbUsedByMonthAndYear,
    },
    {
      label: "Annulés",
      data: ticketListNbCancelledByMonthAndYear,
    },
  ];
});

const firstTicketDayDate = computed(() => {
  if (dailyTicketInfos && dailyTicketInfos.value.length > 0) {
    const ticketInfosList = [...dailyTicketInfos.value]
    return ticketInfosList.reduce((min, p) => {
      const currentDate = createDateFromYYYYMMDD(p.dayMonthYear);
      return currentDate < min ? currentDate : min;
    }, moment().toDate());
  }
  return null;
});

const lastTicketDayDate = computed(() => {
  if (dailyTicketInfos && dailyTicketInfos.value.length > 0) {
    return dailyTicketInfos.value.reduce((max, p) => {
      const currentDate = createDateFromYYYYMMDD(p.dayMonthYear);
      return currentDate > max ? currentDate : max;
    }, moment().toDate());
  }
  return null;
});

const ticketDayDateLabels = computed(() => {
  const dateLabels: string[] = [];
  let currentDate = new Date(firstTicketDayDate.value);
  while (currentDate <= lastTicketDayDate.value) {
    const formattedDate = currentDate.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    dateLabels.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateLabels;
});

const filterDays = (range) => {
  startDate.value = moment(range.start).format("YYYY-MM-DD");
  endDate.value = moment(range.end).format("YYYY-MM-DD");
};

const dataListBenefitsByMonthAndYear = computed(() => {
  return ticketMonthDateLabels.value.map((monthYear) =>
      getTicketNumberByMonthAndYear(monthYear, monthlyTicketInfos.value, 'benefits')
  );
});

const dataListNumberByDay = computed(() => {
  const ticketListNbReservedByDay = ticketDayDateLabels.value.map((day) =>
      getTicketNumberByDay(day, dailyTicketInfos.value, 'nbReserved')
  );

  const ticketListNbPaidByDay = ticketDayDateLabels.value.map((day) =>
      getTicketNumberByDay(day, dailyTicketInfos.value, 'nbPaid')
  );

  const ticketListNbUsedByDay = ticketDayDateLabels.value.map((day) =>
      getTicketNumberByDay(day, dailyTicketInfos.value, 'nbUsed')
  );

  const ticketListNbCancelledByDay = ticketDayDateLabels.value.map((day) =>
      getTicketNumberByDay(day, dailyTicketInfos.value, 'nbCancelled')
  );

  return [
    {
      label: "Réservés",
      data: ticketListNbReservedByDay,
    },
    {
      label: "Payés",
      data: ticketListNbPaidByDay,
    },
    {
      label: "Utilisés",
      data: ticketListNbUsedByDay,
    },
    {
      label: "Annulés",
      data: ticketListNbCancelledByDay,
    },
  ];
});
</script>

<style scoped></style>
