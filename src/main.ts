import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "../src/router/routes";
import { VueQueryPlugin } from "@tanstack/vue-query";
import axios from "axios";
import { setupCalendar } from 'v-calendar';
import 'v-calendar/style.css';

const pinia = createPinia();

// Create a custom Axios instance
export const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-type': 'application/json',
    }
});

// Add a request interceptor
api.interceptors.request.use((config) => {
    config.headers.startTime = new Date().getTime(); // Add a request start time
    return config;
})

api.interceptors.response.use((response) => {
    const startTime = response.config.headers.startTime; // Get the request start time from the response config
    const duration = new Date().getTime() - startTime; // Calculate request duration

    // Log or store the request duration as needed
    console.log(`Request to ${response.config.url} took ${duration}ms`);
    return response;
})

createApp(App)
    .use(router)
    .use(pinia)
    .use(VueQueryPlugin)
    .use(setupCalendar, {})
    .mount("#app");
