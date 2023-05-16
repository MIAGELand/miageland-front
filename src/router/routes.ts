import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../pages/NotFound.vue";
import HomePage from "../pages/HomePage.vue";
import EmployeePage from "../pages/EmployeePage.vue";
import AttractionsPage from "../pages/AttractionsPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import TicketPage from "../pages/TicketPage.vue";
import GeneratorPage from "../pages/GeneratorPage.vue";
import ParkPage from "../pages/ParkPage.vue";
import {checkCookieAndRedirect} from "../util/cookie";
import {useRouter} from "vue-router";
const routerCheck = useRouter();

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
        ...checkCookieAndRedirect(routerCheck),
    },
    {
        path: "/attractions",
        name: "Attractions",
        component: AttractionsPage,
        ...checkCookieAndRedirect(routerCheck),
    },
    {
        path: "/tickets",
        name: "Tickets",
        component: TicketPage,
        ...checkCookieAndRedirect(routerCheck),
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardPage,
        ...checkCookieAndRedirect(routerCheck),
    },
    {
        path: "/park",
        name: "Park",
        component: ParkPage,
        ...checkCookieAndRedirect(routerCheck),
    },
    {
        path: "/generator",
        name: "Generator",
        component: GeneratorPage,
        ...checkCookieAndRedirect(routerCheck),
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

router.beforeEach((to, from, next) => {
    // Check if cookie contains email
    const hasCookie = document.cookie.split(';').some((item) => item.trim().startsWith('email='));

    if (to.name !== 'Home' && !hasCookie) {
        next({ name: 'Home' });
    } else {
        next();
    }
});


export default router;
