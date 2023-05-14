<template>
    <Toaster position="top-right" richColors/>
    <div class="flex flex-col">
        <div class="flex justify-between items-center mb-4">
            <InputSearch @update="updateSearchText" :searchText="searchText" />
            <div class="justify-end">
                <!-- Previous button -->
                <button
                        @click="currentPage = currentPage - 1"
                        :disabled="currentPage === 1"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-white text-gray-800 text-sm font-medium rounded w-10 h-10 disabled:opacity-50"
                >
                    ⬅️
                </button>

                <button
                        :key="1"
                        @click="currentPage = 1"
                        :class="{
                          'bg-gray-800': 1 === currentPage,
                          'bg-white text-gray-500': 1 !== currentPage
                        }"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 text-sm font-medium rounded w-10 h-10"
                >
                    1
                </button>
                <button
                        v-if="currentPage !== 1 && currentPage !== totalPages"
                        :key="currentPage"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-gray-800 text-white text-sm font-medium rounded w-10 h-10"
                >
                    {{ currentPage }}
                </button>
                <button
                        v-else-if="totalPages > 2"
                        :key="currentPage"
                        @click="currentPage = Math.ceil(totalPages / 2)"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-white text-gray-800 text-sm font-medium rounded w-10 h-10"
                >
                    ...
                </button>
                <button
                        v-if="totalPages > 1"
                        :key="totalPages"
                        @click="currentPage = totalPages"
                        :class="{
                          'bg-gray-800': totalPages === currentPage,
                          'bg-white text-gray-500': totalPages !== currentPage
                        }"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 text-sm font-medium rounded w-10 h-10"
                >
                    {{ totalPages }}
                </button>
                <!-- Next button -->
                <button
                        @click="currentPage = currentPage + 1"
                        :disabled="currentPage === totalPages"
                        class="relative inline-flex items-center justify-center py-2 border border-gray-300 bg-white text-sm font-medium rounded w-10 h-10 disabled:opacity-50"
                >
                    ➡️
                </button>
            </div>

        </div>
        <div class="-my-2 overflow-x-auto">
            <TableContainer>
                <table class="min-w-full divide-y divide-gray-200">
                    <TableHeader :rows="rows"/>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="data in filteredData">
                        <td class="px-6 py-4 whitespace-nowrap text-gray-900">
                            <button v-for="(val, action) in actionList" class="font-bold py-2 px-4 rounded mx-0.5 disabled:opacity-50 transition" :class="val.color"
                                    :disabled="checkDisabledRole(<string> action, data['role'])
                                    || checkDisabledTicket(<string>  action, data['state'], data['date'])
                                    || checkDisabledAttraction(<string> action, data['opened'])"
                                    @click="check(<string> action, data)">
                                {{ val.icon }}
                            </button>
                        </td>
                        <td v-for="(key, col) in rows" class="px-6 py-4 whitespace-nowrap text-gray-900">{{ data[col] }}</td>
                    </tr>
                    </tbody>
                </table>
            </TableContainer>
            <PaginationInfo :content="paginationInfo"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref, computed, watch } from 'vue';
import {cancelTicket, validateTicket} from "../../service/ticket-service";
import {downgradeEmployee, removeEmployee, upgradeEmployee} from "../../service/employee-service";
import {toast, Toaster} from "vue-sonner";
import {closeAttraction, openAttraction, removeAttraction} from "../../service/attraction-service";
import TableHeader from "./TableHeader.vue";
import PaginationInfo from "./PaginationInfo.vue";
import TableContainer from "./TableContainer.vue";
import InputSearch from "./InputSearch.vue";

const props = defineProps ({
    data: {
        type: Array,
        required: true
    },
    rows: {
        type: Object,
        required: true
    },
    actionList: {
        type: Object,
    },
    entity: {
        type: String,
        required: true
    }
});

const currentPage = ref(1);
const itemsPerPage = 10;
const searchText = ref('');
const dataFiltered = ref(props.data);
const checkDisabledRole = (action: string, role: string) => {
    return action === 'upgrade' && role === 'ADMIN'
        || action === 'downgrade' && role === 'CLASSIC';
};

const checkDisabledTicket = (action: string, state: string, date: string) => {
    const today = new Date();
    // transform date string to date object
    const dateObject = new Date(date);
    // check if date is 7 days after today date
    const isDateCorrect = dateObject.getTime() > today.getTime() + 7 * 24 * 60 * 60 * 1000;

    return action === 'validate' && state === 'USED'
        || action === 'cancel' && state === 'USED'
        || state === 'CANCELLED'
        || action === 'cancel' && !isDateCorrect;
};

const checkDisabledAttraction = (action: string, opened: boolean) => {
    return action === 'close' && !opened
        || action === 'open' && opened;
};

// Compute total number of pages
const totalPages = computed(() => {
    // Check if filtered data is empty
    if (searchText.value === '') {
        return Math.ceil(props.data.length / itemsPerPage)
    } else {
        return Math.ceil(dataFiltered.value.length / itemsPerPage)
    }
});

// Compute filtered data based on search text and current page
const filteredData = computed(() => {
    dataFiltered.value = props.data;
    if (searchText.value) {
        dataFiltered.value = props.data.filter((item) => {
            return Object.values(item).some((value) => {
                return value.toString().toLowerCase().includes(searchText.value.toLowerCase());
            });
        });
    }
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dataFiltered.value.slice(startIndex, endIndex);
});

const rows = props.rows;

// Compute pagination info
const paginationInfo = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage + 1;
    const endIndex = startIndex + filteredData.value.length - 1;
    return `Affichage de ${startIndex} à ${endIndex} sur ${dataFiltered.value.length} lignes`;
});

const emit = defineEmits(['refresh']);
const check = (action: string, data: any) => {
    // Call api with action and string entity as route
    switch (action) {
        case 'upgrade':
            upgradeEmployee(data['id']).then(() => {
                toast.success('Employé upgrade en ' + data['role'] + ' à jour avec succès.');
                emit('refresh')
            }).catch(() => {
                toast.error('Erreur lors de la mise à jour de l\'employé.');
            });
            break;
        case 'downgrade':
            downgradeEmployee(data['id']).then(() => {
                toast.success('Employé downgrade en ' + data['role'] + ' à jour avec succès.');
                emit('refresh')
            }).catch(() => {
                toast.error('Erreur lors de la mise à jour de l\'employé.');
            });
            break;
        case 'remove':
            removeEmployee(data['id']).then(() => {
                toast.success('Employé supprimé avec succès.');
                emit('refresh')
            }).catch(() => {
                toast.error('Erreur lors de la suppression de l\'employé.');
            })
            break;
        case 'validate':
            validateTicket(data['id']).then(() => {
                toast.success('Ticket validé avec succès.');
                emit('refresh')
            }).catch(() => {
                toast.error('Erreur lors de la validation du ticket.');
            });
            break;
        case 'cancel':
            cancelTicket(data['id']).then((data) => {
                toast.success('Ticket annulé avec succès. ' +
                    'Remboursement de ' + data['price'] + '€.');
                emit('refresh')
            }).catch(() => {
                toast.error('Erreur lors de l\'annulation du ticket.');
            });
            break;
        case 'removeAttraction':
            removeAttraction(data['id']).then(() => {
                toast.success('Attraction supprimée avec succès.');
                emit('refresh')
            }).catch(() => {
                toast.error('Erreur lors de la suppression de l\'attraction.');
            });
            break;
        case 'close':
            closeAttraction(data['id']).then(() => {
                toast.success('Attraction fermée avec succès.');
                emit('refresh')
            }).catch(() => {
                toast.error('Erreur lors de la fermeture de l\'attraction.');
            });
            break;
        case 'open':
            openAttraction(data['id']).then(() => {
                toast.success('Attraction ouverte avec succès.');
                emit('refresh')
            }).catch(() => {
                toast.error('Erreur lors de l\'ouverture de l\'attraction.');
            });
            break;
        default:
            console.log('default');
    }
};

const updateSearchText = (input: string) => {
    searchText.value = input;
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

// Watch for changes in search text
watch(searchText, () => {
    currentPage.value = 1;
});
</script>