import { createWebHistory, createRouter } from "vue-router";
import NotFound from "../src/views/NotFound.vue";

const routes = [
    {
        path: "/",
        alias: "/medicines",
        name: "medicine",
        component: () => import("./views/medicines/MedicineList")
    },
    {
        path: "/medicine-details/:id",
        name: "medicine-details",
        component: () => import("./components/Medicine/MedicineDetails")
    },
    {
        path: "/medicine-manage/:id",
        name: "manage",
        component: () => import("./components/Medicine/ManageMedicine")
    },
    {
        path: "/medicine-manage",
        name: "add-medicine",
        component: () => import("./components/Medicine/ManageMedicine")
    },
    { path: '/:pathMatch(.*)*', name: "not-found", component: NotFound }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;