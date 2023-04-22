import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: MainLayout,
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
