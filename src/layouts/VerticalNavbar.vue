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
            </div>
            <!-- STICKY ELEMENT BOTTOM NAVBAR -->
            <div class="flex flex-col items-start mt-auto mb-4">
                <div class="flex py-2">
                    <img src="../assets/vue.svg" alt="profile" class="h-8 w-8 mr-4" />
                    <!-- TODO : Handle long names -->
                    <div class="mt-1">Name Name</div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
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
