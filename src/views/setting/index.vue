<template>
    <div class="setting-container">
        <div class="move-bar"></div>
        <h1>this is setting</h1>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.setting-container {
    width: 100vw;
    height: 100vh;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
}
.move-bar {
    width: 100%;
    height: 30px;
    background-color: #4098fcff;
    -webkit-app-region: drag;
}
</style>
