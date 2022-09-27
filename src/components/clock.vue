<template>
    <div ref="clockRef" class="clock-container" :style="{ ...props.customStyle }">
        <component :is="timeNode"></component>
    </div>
</template>

<script lang="ts" setup>
import { h, onBeforeUnmount, onMounted, ref } from "vue";
import type { VNode } from "vue";
import dayjs from "dayjs";
import { StyleConfig } from "@/types/clock";

const props = defineProps<{
    /** 自定义样式 */
    customStyle?: StyleConfig;
}>();

const clockRef = ref<HTMLElement | null>(null);

const timeNode = ref<VNode | null>(null);
const updateTimer = ref<any>(null);

const updateTime = () => {
    const now = new Date();
    timeNode.value = h("div", { class: "clock-text-box" }, [
        h("div", { id: "clock-hour" }, dayjs(now).format("HH")),
        h("div", { class: "clock-split" }, ":"),
        h("div", { id: "clock-minute" }, dayjs(now).format("mm")),
        h("div", { class: "clock-split" }, ":"),
        h("div", { id: "clock-second" }, dayjs(now).format("ss")),
    ]);
};

onMounted(() => {
    updateTime();
    updateTimer.value = setInterval(updateTime, 100);
});

onBeforeUnmount(() => {
    clearInterval(updateTimer.value);
});
</script>

<style lang="scss" scoped>
.clock-container {
    font-weight: 700;
    text-shadow: 2px 2px 4px #4d4e4e;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: move;
}

:deep(.clock-text-box) {
    display: flex;
    align-items: center;

    .clock-split {
        margin: 0 0.2em;
    }
}
</style>
