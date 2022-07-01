<template>
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN" abstract>
        <n-message-provider>
            <n-dialog-provider>
                <router-view />
            </n-dialog-provider>
        </n-message-provider>
    </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from "naive-ui";
import useSystemStore from "@/store/modules/system";

const systemStore = useSystemStore();

systemStore.getStyleConfig();
</script>

<style lang="scss">
body {
    width: auto;
    overflow: hidden;
    margin: 0;
    padding: 0;
    line-height: 1;
}
</style>
