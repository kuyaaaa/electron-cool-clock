<template>
    <router-view />
</template>

<script setup lang="ts">
import { ipcWindowMove } from "@/utils/ipcRenderer";

window.addEventListener("DOMContentLoaded", () => {
    const el = document.querySelector("body") as HTMLElement;

    el.addEventListener("mousedown", e => {
        if (
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLButtonElement ||
            e.target instanceof HTMLTextAreaElement
        ) {
            ipcWindowMove(false);
            return;
        }
        ipcWindowMove(true);
    });
    window.addEventListener("mouseup", () => {
        ipcWindowMove(false);
    });
});
</script>

<style lang="scss">
body {
    overflow: hidden;
}
</style>
