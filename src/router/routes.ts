import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../pages/NotFound.vue";
import HomePage from "../pages/HomePage.vue";
import EmployeePage from "../pages/EmployeePage.vue";
import AttractionsPage from "../pages/AttractionsPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import TicketPage from "../pages/TicketPage.vue";
import GeneratorPage from "../pages/GeneratorPage.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/employees",
        name: "Employees",
        component: EmployeePage,
    },
    {
        path: "/attractions",
        name: "Attractions",
        component: AttractionsPage,
    },
    {
        path: "/tickets",
        name: "Tickets",
        component: TicketPage,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardPage,
    },
    {
        path: "/generator",
        name: "Generator",
        component: GeneratorPage,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
