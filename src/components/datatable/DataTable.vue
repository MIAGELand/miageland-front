<template>
  <Toaster position="top-right" richColors />
  <div class="flex flex-col">
    <div class="flex justify-between items-end mb-4">
      <div class="flex">
        <FilterToggle
          :rows="rows"
          :filters="filters"
          :loading="tableLoading"
          @filteredSearch="filteredSearch"
          @resetFilters="resetFilters"
        />
      </div>
      <div class="justify-end" v-if="!isFiltering && !tableLoading">
        <NavigationButton
          :currentPage="currentPage"
          :totalPages="totalPages"
          @update="updateCurrentPage"
          action="previous"
        >
          ⬅️
        </NavigationButton>
        <FirstButton :currentPage="currentPage" @update="updateCurrentPage" />
        <CurrentPageButton
          v-if="currentPage !== 1 && currentPage !== totalPages"
          :totalPages="totalPages"
          :currentPage="currentPage"
        />
        <MiddleDotsButton
          v-else-if="totalPages > 2"
          @update="updateCurrentPage"
          :currentPage="currentPage"
          :totalPages="totalPages"
        />
        <LastButton
          v-if="totalPages > 1"
          :totalPages="totalPages"
          :currentPage="currentPage"
          @update="updateCurrentPage"
        />
        <NavigationButton
          :currentPage="currentPage"
          :totalPages="totalPages"
          @update="updateCurrentPage"
          action="next"
        >
          ➡️
        </NavigationButton>
      </div>
    </div>
    <div v-if="tableLoading || initLoading">
      <TableContainer>
        <table class="min-w-full divide-y divide-gray-400">
          <TableHeader :rows="rows" />
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="_ in 10" class="hover:bg-gray-100">
              <td
                v-for="_ in rows"
                class="px-4 py-6 whitespace-nowrap text-gray-900 text-center"
              >
                <div
                  class="animate-pulse bg-gray-300 h-4 rounded w-3/4 mx-auto"
                ></div>
              </td>
              <!-- FOR ACTION COLUMN -->
              <td class="px-4 py-6 whitespace-nowrap text-gray-900 text-center">
                <div
                  class="animate-pulse bg-gray-300 h-4 rounded w-3/4 mx-auto"
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    </div>
    <div class="-mt-2 overflow-x-auto" v-else>
      <TableContainer>
        <table class="min-w-full divide-y divide-gray-400">
          <TableHeader :rows="rows" />
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="data in tableData" class="hover:bg-gray-100">
              <td
                v-for="(key, col) in rows"
                class="px-4 py-2 whitespace-nowrap text-gray-900 text-center"
              >
                {{ data[col] }}
              </td>
              <td class="px-4 py-2 whitespace-nowrap text-gray-900 text-center">
                <button
                  :title="action"
                  v-for="(val, action) in actionList"
                  class="py-2 px-4 rounded mx-0.5 disabled:opacity-30 transition"
                  :class="val.color"
                  :disabled="checkDisabledRole(<string> action, data['role'])
                                    || checkDisabledTicket(<string>  action, data['state'], data['date'])
                                    || checkDisabledAttraction(<string> action, data['opened'])"
                  @click="check(<string>action, data)"
                >
                  {{ val.icon }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </TableContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, PropType, toRef } from "vue";
import {
  cancelTicket,
  payTicket,
  validateTicket,
} from "../../service/ticket-service";
import {
  downgradeEmployee,
  removeEmployee,
  upgradeEmployee,
} from "../../service/employee-service";
import { toast, Toaster } from "vue-sonner";
import {
  closeAttraction,
  openAttraction,
  removeAttraction,
} from "../../service/attraction-service";
import TableHeader from "./TableHeader.vue";
import TableContainer from "./TableContainer.vue";
import FirstButton from "./pagination/FirstButton.vue";
import CurrentPageButton from "./pagination/CurrentPageButton.vue";
import MiddleDotsButton from "./pagination/MiddleDotsButton.vue";
import NavigationButton from "./pagination/NavigationButton.vue";
import LastButton from "./pagination/LastButton.vue";
import moment from "moment";
import { deleteVisitor } from "../../service/visitor-service";
import FilterToggle from "./filter/FilterToggle.vue";
import { api } from "../../main";
import { getCookie } from "../../util/cookie";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  rows: {
    type: Object as PropType<{ [key: string]: string }>,
    required: true,
  },
  actionList: {
    type: Object,
    required: true,
  },
  entity: {
    type: String,
    required: true,
  },
  totalData: {
    type: Number,
    required: false,
  },
  currentPage: {
    type: Number,
    required: false,
  },
  filters: {
    type: Object,
    required: false,
  },
  initLoading: {
    type: Boolean,
    required: false,
  },
});

const currentPage = ref(props.currentPage || 1);
const itemsPerPage = 100; // needs to be sync with backend pagination size
const rows = props.rows;

const checkDisabledRole = (action: string, role: string) => {
  return (
    (action === "upgrade" && role === "ADMIN") ||
    (action === "downgrade" && role === "CLASSIC") ||
    role === "MANAGER"
  );
};

const checkDisabledTicket = (action: string, state: string, date: string) => {
  // Check with moment if date is before today
  const today = moment();
  const ticketDate = moment(date);
  const isToday = ticketDate.isSame(today, "day");
  const isBeforeToday = ticketDate.isBefore(today, "day");
  const isLessThan7Days = ticketDate.diff(today, "days") < 7;
  return (
    (action === "pay" && (state !== "RESERVED" || isBeforeToday)) ||
    (action === "validate" && (state !== "PAID" || !isToday)) ||
    (action === "cancel" && (state === "USED" || isLessThan7Days)) ||
    state === "CANCELLED"
  );
};

const checkDisabledAttraction = (action: string, opened: boolean) => {
  return (action === "close" && !opened) || (action === "open" && opened);
};

// Compute total number of pages
const totalPages = computed(() => {
  if (isFiltering.value) {
    return 1;
  }
  if (props.totalData) {
    return Math.ceil(props.totalData / itemsPerPage);
  } else if (props.data.length > 0) {
    return Math.ceil(props.data.length / itemsPerPage);
  } else {
    return 1;
  }
});

const emit = defineEmits(["refresh", "update"]);
const check = (action: string, data: any) => {
  // Call api with action and string entity as route
  switch (action) {
    case "upgrade":
      upgradeEmployee(data["id"])
        .then(() => {
          toast.success("Employé upgrade en ADMIN à jour avec succès.");
          refresh();
        })
        .catch(() => {
          toast.error("Erreur lors de la mise à jour de l'employé.");
        });
      break;
    case "downgrade":
      downgradeEmployee(data["id"])
        .then(() => {
          toast.success("Employé downgrade en CLASSIC à jour avec succès.");
          refresh();
        })
        .catch(() => {
          toast.error("Erreur lors de la mise à jour de l'employé.");
        });
      break;
    case "remove":
      removeEmployee(data["id"])
        .then(() => {
          toast.success("Employé supprimé avec succès.");
          refresh();
        })
        .catch(() => {
          toast.error("Erreur lors de la suppression de l'employé.");
        });
      break;
    case "pay":
      payTicket(data["id"])
        .then((data) => {
          toast.success(
            "Ticket payé avec succès. " + "Paiement de " + data["price"] + "€."
          );
          refresh();
        })
        .catch(() => {
          toast.error("Erreur lors de l'achat du ticket.");
        });
      break;
    case "validate":
      validateTicket(data["id"])
        .then(() => {
          toast.success("Ticket validé avec succès.");
          refresh();
        })
        .catch(() => {
          toast.error("Erreur lors de la validation du ticket.");
        });
      break;
    case "cancel":
      const prevState = data["state"];
      cancelTicket(data["id"])
        .then((data) => {
          if (prevState === "PAID") {
            toast.success(
              "Ticket annulé avec succès. " +
                "Remboursement de " +
                data["price"] +
                "€."
            );
          } else if (prevState === "RESERVED") {
            toast.success("Ticket annulé avec succès. Pas de remboursement.");
          }
          refresh();
        })
        .catch(() => {
          toast.error("Erreur lors de l'annulation du ticket.");
        });
      break;
    case "removeAttraction":
      removeAttraction(data["id"])
        .then(() => {
          toast.success("Attraction supprimée avec succès.");
          refresh();
        })
        .catch(() => {
          toast.error("Erreur lors de la suppression de l'attraction.");
        });
      break;
    case "close":
      closeAttraction(data["id"])
        .then(() => {
          toast.success("Attraction fermée avec succès.");
          refresh();
        })
        .catch(() => {
          toast.error("Erreur lors de la fermeture de l'attraction.");
        });
      break;
    case "open":
      openAttraction(data["id"])
        .then(() => {
          toast.success("Attraction ouverte avec succès.");
          refresh();
        })
        .catch(() => {
          toast.error("Erreur lors de l'ouverture de l'attraction.");
        });
      break;
    case "removeVisitor":
      deleteVisitor(data["id"])
        .then(() => {
          toast.success("Visiteur supprimé avec succès.");
          refresh();
        })
        .catch(() => {
          toast.error("Erreur lors de la suppression de l'utilisateur.");
        });
      break;
    default:
      console.log("default");
  }
};

const updateCurrentPage = (page: number) => {
  currentPage.value = page;
  emit("update", page);
};

const filteredSearch = (data: any) => {
  tableLoading.value = true;
  const filtered = data.filter((row: any) => {
    return row.value !== "" || row.options;
  });
  // Get last element from current url
  const lastElement = window.location.href.split("/").pop();
  let url = lastElement + "/search?";
  // Build url with search params from filtered array
  filtered.forEach((element: any) => {
    if (element.value === undefined) {
      // Loop on options and if checked = true, add to url
      element.options.forEach((option: any) => {
        if (option.checked) {
          url += element.key + "=" + option.label.trim() + "&";
        }
      });
    } else {
      url += element.key + "=" + element.value + "&";
    }
  });
  // Remove last character from url (last &)
  url = url.slice(0, -1);
  filteredUrl.value = url;
  // Call to api with url
  callFilteredApi(filteredUrl.value);
};

const callFilteredApi = (url) => {
  api
      .get(url, {
        headers: {
          Authorization: "email=" + getCookie("email"),
        },
      })
      .then((data) => {
        isFiltering.value = true;
        entityData.value = data.data;
        toast.success("Données récupérées avec succès.");
        tableLoading.value = false;
      })
      .catch(() => {
        toast.error("Erreur lors de la récupération des données.");
        tableLoading.value = false;
      });
}

const filteredUrl = ref("")
const entityData = ref([]);
const isFiltering = ref(false);
const tableLoading = ref(false);

const tableData = computed(() => {
  if (isFiltering.value) {
    return entityData.value;
  } else {
    return props.data;
  }
});

const refresh = () => {
  emit("refresh");
  if (isFiltering.value) {
    callFilteredApi(filteredUrl.value);
  }
};

const resetFilters = () => {
  isFiltering.value = false;
  toast.success("Filtres réinitialisés avec succès.");
};

// Watch for changes in current page
watch(currentPage, (newPage) => {
  if (newPage < 1) {
    currentPage.value = 1;
  }
  if (newPage > totalPages.value) {
    currentPage.value = totalPages.value;
  }
});
</script>
