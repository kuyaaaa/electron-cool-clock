<template>
    <div
        id="clock-container"
        :style="{ cursor: props.moveDisabled ? 'default' : 'move', ...props.customStyle }"
    >
        <span>
            {{ time }}
        </span>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import dayjs from "dayjs";
import { ipcWindowMove } from "@/utils/ipcRenderer";
import { StyleConfig } from "@/types/clock";

const props = defineProps<{
    /** 禁用窗口移动 */
    moveDisabled?: boolean;
    /** 自定义样式 */
    customStyle?: StyleConfig;
}>();

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

/** 移动窗口事件绑定 */
const bindMoveListener = () => {
    const el = document.getElementById("clock-container");
    el?.addEventListener("mousedown", handleClockMoveStart);
    el?.addEventListener("mouseup", handleClockMoveEnd);
};
/** 移动窗口事件卸载 */
const removeMoveListener = () => {
    const el = document.getElementById("clock-container");
    el?.removeEventListener("mousedown", handleClockMoveStart);
    el?.removeEventListener("mouseup", handleClockMoveEnd);
};

onMounted(() => {
    updateTimer.value = setInterval(updateTime, 100);
    if (!props.moveDisabled) {
        bindMoveListener();
    }
});

onBeforeUnmount(() => {
    clearInterval(updateTimer.value);
    if (!props.moveDisabled) {
        removeMoveListener();
    }
});
</script>

<style lang="scss" scoped>
#clock-container {
    font-size: 48px;
    font-weight: 700;
    color: #18a058;
    text-shadow: 2px 2px 4px #4d4e4e;
}
</style>
