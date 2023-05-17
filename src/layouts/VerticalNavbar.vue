<template>
    <div id="container" class="hidden md:block">
        <nav
                class="h-screen flex flex-col bg-zinc-900 px-4 pt-8 text-white"
                id="navbar"
        >
            <div class="flex cursor-pointer items-center" @click="$router.push('/')">
                <img src="../assets/ppl.svg" alt="miageland" class="h-8 w-8" />
                <span class="ml-4 text-xl font-bold">MIAGELand</span>
            </div>

            <!-- NAV BAR-->
            <div class="flex flex-col items-start mt-8 ">
                <div class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
                     @click="$router.push({ name: 'Employees' })"
                >
                    <img src="../assets/employees.svg" alt="locker" class="h-8 w-8 mr-4" />
                    <button
                            class="font-bold"
                    >
                        Employés
                    </button>
                </div>
                <div class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
                     @click="$router.push({ name: 'Attractions' })"
                >
                    <img
                            src="../assets/attractions.svg"
                            alt="attractions"
                            class="h-8 w-8 mr-4"
                    />
                    <button
                            class="font-bold"
                    >
                        Attractions
                    </button>
                </div>
                <div class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
                     @click="$router.push({ name: 'Tickets' })"
                >
                    <img
                            src="../assets/tickets.svg"
                            alt="visitors"
                            class="h-8 w-8 mr-4"
                    />
                    <button
                            class="font-bold"
                    >
                        Tickets
                    </button>
                </div>

                <div class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
                     @click="$router.push({ name: 'Park' })"
                >
                    <img
                        src="../assets/park.svg"
                        alt="park"
                        class="h-8 w-8 mr-4"
                    />
                    <button
                        class="font-bold"
                    >
                        Parc
                    </button>
                </div>

                <div class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
                     @click="$router.push({ name: 'Dashboard' })"
                >
                    <img
                        src="../assets/dashboard.svg"
                        alt="dashboard"
                        class="h-8 w-8 mr-4"
                    />
                    <button
                        class="font-bold"
                    >
                        Dashboard
                    </button>
                </div>

                <div class="w-full my-2">
                    <hr class="border-white">
                </div>

                <div class="flex py-2 pl-2 w-full rounded hover:bg-gray-700 cursor-pointer"
                     @click="$router.push({ name: 'Generator' })"
                >
                    <img
                        src="../assets/generator.svg"
                        alt="generator"
                        class="h-8 w-8 mr-4"
                    />
                    <button
                        class="font-bold"
                    >
                        Générateur
                    </button>
                </div>
            </div>
            <!-- STICKY ELEMENT BOTTOM NAVBAR -->
            <div class="flex flex-col items-start mt-auto mb-4">
                <div class="flex py-2 items-center gap-4">
                    <img src="../assets/vue.svg" alt="profile" class="h-8 w-8" />
                    <div class="flex flex-col gap-0.5">
                        <div >{{employeeName}}</div>
                        <div>{{employeeRole}}</div>
                    </div>

                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import {useEmployeeList} from "../queries/employee.query";
import {computed} from "vue";
import {getCookie} from "../util/cookie";

const { data: employeeList } = useEmployeeList();
const emailFromCookie = computed(() => {
    return getCookie("email")
});
const employeeName = computed(() => {
    if (employeeList.value) {
        const employee = employeeList.value?.find((employee) => employee.email === emailFromCookie.value);
        if (employee) {
            return employee.name + " " + employee.surname;
        }
    }
    return ""
});

const employeeRole = computed(() => {
    if (employeeList.value) {
        const employee = employeeList.value?.find((employee) => employee.email === emailFromCookie.value);
        if (employee) {
            return employee.role;
        }
    }
    return ""
});
defineProps({
    title: String,
    logoUrl: String,
})
</script>


<style scoped>
#navbar {
    width: 200px;
}
</style>
