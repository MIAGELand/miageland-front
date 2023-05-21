import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../pages/NotFound.vue";
import HomePage from "../pages/HomePage.vue";
import EmployeePage from "../pages/admin/EmployeePage.vue";
import AttractionsPage from "../pages/admin/AttractionsPage.vue";
import DashboardPage from "../pages/admin/DashboardPage.vue";
import TicketPage from "../pages/admin/TicketPage.vue";
import GeneratorPage from "../pages/admin/GeneratorPage.vue";
import ParkPage from "../pages/admin/ParkPage.vue";
import {getCookie} from "../util/cookie";
import {useRouter} from "vue-router";
import VisitorAccess from "../pages/visitor/VisitorAccess.vue";
import VisitorReservation from "../pages/visitor/VisitorReservation.vue";
import VisitorProfile from "../pages/visitor/VisitorProfile.vue";
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
        path: "/park",
        name: "Park",
        component: ParkPage,
    },
    {
        path: "/generator",
        name: "Generator",
        component: GeneratorPage,
    },
    {
        path: "/access",
        name: "ParkAccess",
        component: VisitorAccess,
    },
    {
        path: "/reservations",
        name: "Reservations",
        component: VisitorReservation,
    },
    {
        path: "/profile",
        name: "Profile",
        component: VisitorProfile,
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
    const hasCookie = getCookie('email')
        || getCookie('id')
        || getCookie('name') && getCookie('surname');
    if (to.name !== 'Home' && !hasCookie) {
        next({ name: 'Home' });
    } else {
        next();
    }
});


export default router;
