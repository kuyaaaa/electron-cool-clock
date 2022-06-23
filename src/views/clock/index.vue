<template>
    <span class="clock-text">
        {{ time }}
    </span>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import dayjs from "dayjs";

const time = ref("");
const updateTimer = ref<any>(null);

const updateTime = () => {
    const now = new Date();
    time.value = dayjs(now).format("HH : mm : ss");
};

onMounted(() => {
    updateTimer.value = setInterval(updateTime, 100);
});

onBeforeUnmount(() => {
    clearInterval(updateTimer.value);
});
</script>

<style lang="scss" scoped>
.clock-text {
    font-size: 48px;
    font-weight: 700;
    color: #18a058;
    cursor: default;
    text-shadow: 2px 2px 4px #4d4e4e;
}
</style>
