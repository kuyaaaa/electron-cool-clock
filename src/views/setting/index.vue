<template>
    <n-layout class="setting-container">
        <n-layout-header class="header-container">
            <div class="move-bar">
                <n-icon>
                    <settings-icon />
                </n-icon>
                <span>设置</span>
            </div>
            <n-button class="close-btn" type="error" :bordered="false" @click="handleClose">
                <n-icon><x-icon /></n-icon>
            </n-button>
        </n-layout-header>
        <n-layout-content class="content-container" embedded>
            <n-grid x-gap="30" :cols="3">
                <n-gi span="2">
                    <n-divider title-placement="left">示例</n-divider>
                    <div class="ex-container">
                        <clock :custom-style="settingFrom" move-disabled />
                    </div>
                </n-gi>
                <n-gi>
                    <n-form
                        ref="formRef"
                        label-width="auto"
                        label-placement="left"
                        :model="settingFrom"
                    >
                        <n-form-item label="颜色">
                            <n-color-picker v-model:value="settingFrom.color" :modes="['hex']" />
                        </n-form-item>
                        <n-form-item label="字体大小">
                            <input-number-suffix
                                v-model:value="settingFrom.fontSize"
                                style="width: 100%"
                                suffix="px"
                                :min="14"
                                :max="100"
                            />
                        </n-form-item>
                        <n-form-item>
                            <n-button type="success" block @click="handleSave">
                                <template #icon>
                                    <n-icon>
                                        <checkbox-icon />
                                    </n-icon>
                                </template>
                                保存
                            </n-button>
                        </n-form-item>
                    </n-form>
                </n-gi>
            </n-grid>
        </n-layout-content>
    </n-layout>
</template>

<script lang="ts" setup>
import { Settings as SettingsIcon, X as XIcon, Checkbox as CheckboxIcon } from "@vicons/tabler";
import { ref } from "vue";
import { cloneDeep, isEqual } from "lodash";
import { useDialog } from "naive-ui";
import { ipcCloseCurrentWindow, ipcReloadWindow } from "@/utils/ipcRenderer";
import Clock from "@/components/clock.vue";
import { StyleConfig } from "@/types/clock";
import useSystemStore from "@/store/modules/system";

const dialog = useDialog();

const systemStore = useSystemStore();

const { styleConfig: formerStyle } = systemStore;
const settingFrom = ref<StyleConfig>(cloneDeep(formerStyle));

const handleClose = () => {
    const hasChanged = isEqual(formerStyle, settingFrom.value);
    if (hasChanged) {
        ipcCloseCurrentWindow();
    } else {
        dialog.warning({
            title: "警告",
            content: "有已修改但未保存的设置，确定要放弃保存吗？",
            positiveText: "确定",
            negativeText: "返回",
            maskClosable: false,
            onPositiveClick: () => {
                ipcCloseCurrentWindow();
            },
        });
    }
};

const handleSave = () => {
    systemStore.setStyleConfig(settingFrom.value);
    ipcCloseCurrentWindow();
    ipcReloadWindow();
};
</script>

<style lang="scss" scoped>
.setting-container {
    width: 100vw;
    height: 100vh;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    border: 4px solid #303133;
}

.header-container {
    display: flex;
}

$move-bar-height: 40px;
.move-bar {
    width: 100%;
    height: $move-bar-height;
    color: #fff;
    font-size: 16px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 0px 15px;
    background-color: #36ad6aff;
    -webkit-app-region: drag;
}

.close-btn {
    width: $move-bar-height;
    height: $move-bar-height;
    border-radius: 0;
}

.content-container {
    padding: 15px 20px;
    height: calc(100% - $move-bar-height);
}

.ex-container {
    width: 616px;
    height: 347px;
    background-image: url("/src/assets/images/front/windows-bg.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
