<template>
    <clock
        ref="clockRef"
        :custom-style="clockStyle"
        @mousedown="handleClockMoveStart"
        @mouseup="handleClockMoveEnd"
    />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { nextTick, onMounted, ref } from "vue";
import useSystemStore from "@/store/modules/system";
import { ipcGetPageSize, ipcWindowMove, ipcWindowMoveFinish } from "@/utils/ipcRenderer";

const systemStore = useSystemStore();

const { styleConfig: clockStyle } = storeToRefs(systemStore);

const clockRef = ref<any>(null);

/** 时钟窗口移动开始事件 */
const handleClockMoveStart = (e: MouseEvent) => {
    if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLTextAreaElement
    ) {
        ipcWindowMove(false);
        return;
    }
    ipcWindowMove(true);
};
/** 时钟窗口移动结束事件 */
const handleClockMoveEnd = (e: MouseEvent) => {
    ipcWindowMove(false);
    ipcWindowMoveFinish();
};

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
