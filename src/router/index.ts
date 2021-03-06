import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "clock",
        component: () => import("@/views/clock/index.vue"),
    },
    {
        path: "/setting",
        name: "setting",
        component: () => import("@/views/setting/index.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
