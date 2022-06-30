<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN" abstract>
        <router-view />
    </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from "naive-ui";
</script>

<style lang="scss">
body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    line-height: 1;
}
</style>
