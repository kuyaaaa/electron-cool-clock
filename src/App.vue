<template>
    <router-view />
</template>

<script setup lang="ts">
import { throttle } from "lodash";

window.addEventListener("DOMContentLoaded", () => {
    const el = document.querySelector("body") as HTMLElement;
    let dragging = false;
    let mouseX = 0;
    let mouseY = 0;
    el.addEventListener("mousedown", e => {
        dragging = true;
        const { pageX, pageY } = e;
        mouseX = pageX;
        mouseY = pageY;
    });
    window.addEventListener("mouseup", () => {
        dragging = false;
    });
    window.addEventListener(
        "mousemove",
        throttle((e: MouseEvent) => {
            if (dragging) {
                const { pageX, pageY } = e;
                const win = require("@electron/remote").getCurrentWindow();
                const pos = win.getPosition();
                pos[0] = pos[0] + pageX - mouseX;
                pos[1] = pos[1] + pageY - mouseY;
                win.setPosition(pos[0], pos[1], true);
            }
        }, 50)
    );
});
</script>

<style lang="scss">
body {
    overflow: hidden;
}
</style>
