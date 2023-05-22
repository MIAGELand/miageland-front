<template>
    <Toaster position="top-right" richColors/>
    <div class="flex flex-col">
        <div class="flex justify-between items-center mb-4">
            <InputSearch @update="updateSearchText" :searchText="searchText" />
            <div class="justify-end">
                <NavigationButton :currentPage="currentPage" :totalPages="totalPages" @update="updateCurrentPage" action="previous">
                        ⬅️
                </NavigationButton>
                <FirstButton :currentPage="currentPage" @update="updateCurrentPage"/>
                <CurrentPageButton
                    v-if="currentPage !== 1 && currentPage !== totalPages"
                    :totalPages="totalPages" :currentPage="currentPage"
                />
                <MiddleDotsButton
                    v-else-if="totalPages > 2"
                    @update="updateCurrentPage"
                    :currentPage="currentPage" :totalPages="totalPages"
                />
                <LastButton
                    v-if="totalPages > 1"
                    :totalPages="totalPages" :currentPage="currentPage" @update="updateCurrentPage"
                />
                <NavigationButton :currentPage="currentPage" :totalPages="totalPages" @update="updateCurrentPage" action="next">
                    ➡️
                </NavigationButton>
            </div>
        </div>
        <div class="-mt-2 overflow-x-auto">
            <TableContainer>
                <table class="min-w-full divide-y divide-gray-400">
                    <TableHeader :rows="rows"/>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="data in props.data" class="hover:bg-gray-100">
                        <td v-for="(key, col) in rows" class="px-4 py-2 whitespace-nowrap text-gray-900 text-center">{{ data[col] }}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-gray-900 text-center">
                            <button :title="action" v-for="(val, action) in actionList" class="font-bold py-2 px-4 rounded mx-0.5 disabled:opacity-30 transition" :class="val.color"
                                    :disabled="checkDisabledRole(<string> action, data['role'])
                                    || checkDisabledTicket(<string>  action, data['state'], data['date'])
                                    || checkDisabledAttraction(<string> action, data['opened'])"
                                    @click="check(<string> action, data)">
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
import {ref, computed, watch, PropType} from 'vue';
import {cancelTicket, payTicket, validateTicket} from "../../service/ticket-service";
import {downgradeEmployee, removeEmployee, upgradeEmployee} from "../../service/employee-service";
import {toast, Toaster} from "vue-sonner";
import {closeAttraction, openAttraction, removeAttraction} from "../../service/attraction-service";
import TableHeader from "./TableHeader.vue";
import TableContainer from "./TableContainer.vue";
import InputSearch from "./InputSearch.vue";
import FirstButton from "./pagination/FirstButton.vue";
import CurrentPageButton from "./pagination/CurrentPageButton.vue";
import MiddleDotsButton from "./pagination/MiddleDotsButton.vue";
import NavigationButton from "./pagination/NavigationButton.vue";
import LastButton from "./pagination/LastButton.vue";
import moment from 'moment';

const props = defineProps ({
    data: {
        type: Array,
        required: true
    },
    rows: {
        type: Object as PropType<{ [key: string]: string }>,
        required: true
    },
    actionList: {
        type: Object,
        required: true
    },
    entity: {
        type: String,
        required: true
    },
    totalData: {
        type: Number,
        required: false
    },
    currentPage: {
        type: Number,
        required: false
    }
});

const currentPage = ref(props.currentPage || 1);
const itemsPerPage = 100; // needs to be sync with backend pagination size
const searchText = ref('');
const rows = props.rows;

const checkDisabledRole = (action: string, role: string) => {
    return action === 'upgrade' && role === 'ADMIN'
        || action === 'downgrade' && role === 'CLASSIC'
        || role === "MANAGER";
};

const checkDisabledTicket = (action: string, state: string, date: string) => {
    // Check with moment if date is before today
    const today = moment();
    const ticketDate = moment(date);
    const isToday = ticketDate.isSame(today, 'day');
    const isBeforeToday = ticketDate.isBefore(today, 'day');
    const isLessThan7Days = ticketDate.diff(today, 'days') < 7;
    return (action === 'pay' && (state !== 'RESERVED' || isBeforeToday))
        || (action === 'validate' && (state !== 'PAID' || !isToday))
        || (action === 'cancel' && (state === 'USED' || isLessThan7Days))
        || (state === 'CANCELLED');
};

const checkDisabledAttraction = (action: string, opened: boolean) => {
    return action === 'close' && !opened
        || action === 'open' && opened;
};

// Compute total number of pages
const totalPages = computed(() => {
    if (props.totalData) {
        return Math.ceil(props.totalData / itemsPerPage)
    } else if (props.data.length > 0) {
        return Math.ceil(props.data.length / itemsPerPage)
    } else {
        return 1;
    }
});

// Compute filtered data based on search text and current page
// TODO : modify with SEARCH button to avoid too many requests
/*const filteredData = computed(() => {
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
});*/

const emit = defineEmits(['refresh', 'update']);
const check = (action: string, data: any) => {
    // Call api with action and string entity as route
    switch (action) {
        case 'upgrade':
            upgradeEmployee(data['id']).then(() => {
                toast.success('Employé upgrade en ADMIN à jour avec succès.');
                emit('refresh')
            }).catch(() => {
                toast.error('Erreur lors de la mise à jour de l\'employé.');
            });
            break;
        case 'downgrade':
            downgradeEmployee(data['id']).then(() => {
                toast.success('Employé downgrade en CLASSIC à jour avec succès.');
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
        case 'pay':
          payTicket(data['id']).then((data) => {
            toast.success('Ticket payé avec succès. ' +
                'Paiement de ' + data['price'] + '€.');
            emit('refresh')
          }).catch(() => {
            toast.error('Erreur lors de l\'achat du ticket.');
          });
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

const updateCurrentPage = (page: number) => {
    currentPage.value = page;
    emit('update', page);
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