import { defineStore } from "pinia";
import { StyleConfig } from "@/types/clock";
import { STYLE_CONFIG } from "@/config/key";
import { defaultStyleConfig } from "@/config/default";

const useSystemStore = defineStore({
    id: "system",
    state: () => {
        return {
            /** css样式设置 */
            styleConfig: defaultStyleConfig,
        };
    },
    actions: {
        /** css样式设置存储 */
        setStyleConfig(config: StyleConfig) {
            this.styleConfig = config;
            const jsonConfig = JSON.stringify(this.styleConfig);
            window.localStorage.setItem(STYLE_CONFIG, jsonConfig);
        },
        /** css样式设置获取 */
        getStyleConfig() {
            const config = window.localStorage.getItem(STYLE_CONFIG) || "{}";
            this.styleConfig = JSON.parse(config);
        },
    },
});

export default useSystemStore;
