<template>
    <div ref="clockRef" class="clock-container" :style="{ ...props.customStyle }">
        <component :is="timeNode"></component>
    </div>
</template>

<script lang="ts" setup>
import { computed, h, onBeforeUnmount, onMounted, ref } from "vue";
import type { VNode } from "vue";
import dayjs from "dayjs";
import { ClockConfig, StyleConfig } from "@/types/clock";

const props = defineProps<{
    /** 自定义样式 */
    customStyle?: StyleConfig;
    /** 其他相关设置 */
    clockConfig?: ClockConfig;
}>();

const clockRef = ref<HTMLElement | null>(null);

const timeNode = ref<VNode | null>(null);
const updateTimer = ref<any>(null);

const nowDate = ref(new Date());

const updateTime = () => {
    nowDate.value = new Date();
    timeNode.value = h("div", { class: "clock-text-box" }, [
        h("div", { id: "clock-hour" }, dayjs(nowDate.value).format("HH")),
        h("div", { class: "clock-split" }, ":"),
        h("div", { id: "clock-minute" }, dayjs(nowDate.value).format("mm")),
        h("div", { class: "clock-split" }, ":"),
        h("div", { id: "clock-second" }, dayjs(nowDate.value).format("ss")),
    ]);
};

/** 闪烁效果 */
const style_opacity = computed(() => {
    if (props.clockConfig?.flashing) {
        return dayjs(nowDate.value).second() % 2;
    } else {
        return 1;
    }
});
/** 过渡动画 */
const style_split_transition = computed(() =>
    props.clockConfig?.splitTransition ? "opacity" : "none"
);

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
        opacity: v-bind(style_opacity);
        transition: v-bind(style_split_transition) 0.9s;
    }
}
</style>
