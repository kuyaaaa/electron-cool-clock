import { createApp } from "vue";
import App from "./App.vue";
// router
import router from "@/router";
// pinia
import store from "@/store";

createApp(App).use(store).use(router).mount("#app");
