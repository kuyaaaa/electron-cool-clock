<template>
    <clock :custom-style="clockStyle" />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import useSystemStore from "@/store/modules/system";

const systemStore = useSystemStore();

const { styleConfig: clockStyle } = storeToRefs(systemStore);
</script>
