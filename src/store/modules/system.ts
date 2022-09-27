import { defineStore } from "pinia";
import { StyleConfig, ClockConfig } from "@/types/clock";
import { STYLE_CONFIG, CLOCK_CONFIG } from "@/config/key";
import { defaultStyleConfig, defaultClockConfig } from "@/config/default";

const state = {
    /** css样式设置 */
    styleConfig: {} as StyleConfig,
    /** 其他通用设置 */
    clockConfig: {} as ClockConfig,
};

/** 本地存储用的key名 */
const storageKeys: { [P in keyof typeof state]: { key: string; default: typeof state[P] } } = {
    styleConfig: { key: STYLE_CONFIG, default: defaultStyleConfig },
    clockConfig: { key: CLOCK_CONFIG, default: defaultClockConfig },
};

const useSystemStore = defineStore({
    id: "system",
    state: () => {
        return state;
    },
    actions: {
        /**
         * 存储设置信息
         * @param   key      state中对应的键名
         * @param   config   所要存储的设置参数对象
         */
        setConfig<K extends keyof typeof state, C extends typeof state[K]>(key: K, config: C) {
            this.$state[key] = config;
            const jsonConfig = JSON.stringify(config);
            window.localStorage.setItem(storageKeys[key].key, jsonConfig);
        },
        /** 获取本地存储参数 */
        getConfig() {
            (Object.keys(storageKeys) as (keyof typeof storageKeys)[]).forEach(key => {
                const obj = storageKeys[key];
                const config = window.localStorage.getItem(obj.key) || JSON.stringify(obj.default);
                this[key] = JSON.parse(config);
            });
        },
        /** css样式设置存储 */
        setStyleConfig(config: StyleConfig) {
            this.setConfig("styleConfig", config);
        },
        /** 其他设置存储 */
        setClockConfig(config: ClockConfig) {
            this.setConfig("clockConfig", config);
        },
    },
});

export default useSystemStore;
