import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../pages/NotFound.vue";
import HomePage from "../pages/HomePage.vue";
import AdminPage from "../pages/AdminPage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/admin",
        name: "Admin",
        component: AdminPage,
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
