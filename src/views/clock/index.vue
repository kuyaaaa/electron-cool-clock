<template>
    <div id="clock-container" @mousedown="handleClockMoveStart" @mouseup="handleClockMoveEnd">
        <span>
            {{ time }}
        </span>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import dayjs from "dayjs";
import { ipcWindowMove } from "@/utils/ipcRenderer";

const time = ref("");
const updateTimer = ref<any>(null);

const updateTime = () => {
    const now = new Date();
    time.value = dayjs(now).format("HH : mm : ss");
};

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
};

onMounted(() => {
    updateTimer.value = setInterval(updateTime, 100);
});

onBeforeUnmount(() => {
    clearInterval(updateTimer.value);
});
</script>

<style lang="scss" scoped>
#clock-container {
    font-size: 48px;
    font-weight: 700;
    color: #18a058;
    cursor: move;
    text-shadow: 2px 2px 4px #4d4e4e;
}
</style>
