<template>
    <div
        ref="clockRef"
        class="clock-container"
        :style="{ cursor: props.moveDisabled ? 'default' : 'move', ...props.customStyle }"
    >
        <div>
            {{ time }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import dayjs from "dayjs";
import { ipcGetPageSize, ipcWindowMove } from "@/utils/ipcRenderer";
import { StyleConfig } from "@/types/clock";

const props = defineProps<{
    /** 禁用窗口移动 */
    moveDisabled?: boolean;
    /** 自定义样式 */
    customStyle?: StyleConfig;
}>();

const clockRef = ref<HTMLElement | null>(null);

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
    clockRef.value?.addEventListener("mousedown", handleClockMoveStart);
    clockRef.value?.addEventListener("mouseup", handleClockMoveEnd);
};
/** 移动窗口事件卸载 */
const removeMoveListener = () => {
    clockRef.value?.removeEventListener("mousedown", handleClockMoveStart);
    clockRef.value?.removeEventListener("mouseup", handleClockMoveEnd);
};

/** 获取容器的宽高 */
const getPageSize = () => {
    return {
        width: clockRef.value?.offsetWidth || 0,
        height: clockRef.value?.offsetHeight || 0,
    };
};

onMounted(() => {
    // 更新时间并绑定定时器
    updateTime();
    updateTimer.value = setInterval(updateTime, 100);
    // 修改窗口实际大小
    nextTick(() => ipcGetPageSize(getPageSize()));
    // 绑定移动
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
.clock-container {
    font-weight: 700;
    text-shadow: 2px 2px 4px #4d4e4e;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
}
</style>
