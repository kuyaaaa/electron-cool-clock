<template>
    <div ref="clockRef" class="clock-container" :style="{ ...props.customStyle }">
        <div>
            {{ time }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import dayjs from "dayjs";
import { StyleConfig } from "@/types/clock";

const props = defineProps<{
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
</style>
