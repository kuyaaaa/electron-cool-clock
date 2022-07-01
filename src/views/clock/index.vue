<template>
    <clock ref="clockRef" :custom-style="clockStyle" />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { nextTick, onMounted, ref } from "vue";
import useSystemStore from "@/store/modules/system";
import { ipcGetPageSize } from "@/utils/ipcRenderer";

const systemStore = useSystemStore();

const { styleConfig: clockStyle } = storeToRefs(systemStore);

const clockRef = ref<any>(null);

/** 获取容器的宽高 */
const getPageSize = () => {
    const el = clockRef.value.$el as HTMLElement;
    return {
        width: el.offsetWidth || 0,
        height: el.offsetHeight || 0,
    };
};

onMounted(() => {
    nextTick(() => ipcGetPageSize(getPageSize()));
});
</script>
