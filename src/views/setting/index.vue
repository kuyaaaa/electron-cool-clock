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
                <n-icon>
                    <x-icon />
                </n-icon>
            </n-button>
        </n-layout-header>
        <n-layout-content class="content-container" embedded>
            <n-grid x-gap="30" :cols="3" style="height: 100%">
                <n-gi span="2">
                    <n-divider title-placement="left">示例</n-divider>
                    <div class="ex-container">
                        <clock :custom-style="styleConfigForm" :clock-config="clockConfigForm" />
                    </div>
                </n-gi>
                <n-gi>
                    <n-scrollbar style="height: 578px; margin-bottom: 10px" trigger="none">
                        <n-form label-width="auto" label-placement="left">
                            <n-divider title-placement="left">
                                <n-icon>
                                    <palette-icon />
                                </n-icon>
                                <n-text style="margin-left: 5px">样式相关</n-text>
                            </n-divider>
                            <n-form-item label="颜色">
                                <n-color-picker
                                    v-model:value="styleConfigForm.color"
                                    :modes="['hex']"
                                />
                            </n-form-item>
                            <n-form-item label="字体大小">
                                <input-number-suffix
                                    v-model:value="styleConfigForm.fontSize"
                                    style="width: 100%"
                                    suffix="px"
                                    :min="14"
                                    :max="100"
                                />
                            </n-form-item>
                            <n-form-item label="字体">
                                <n-select
                                    v-model:value="styleConfigForm.fontFamily"
                                    filterable
                                    placeholder="选择字体"
                                    :options="fontSelectOptions"
                                    :loading="fontFamilyLoading"
                                />
                            </n-form-item>
                            <n-divider title-placement="left">
                                <n-icon>
                                    <puzzle-icon />
                                </n-icon>
                                <n-text style="margin-left: 5px">其他设置</n-text>
                            </n-divider>
                            <n-form-item label="闪烁效果">
                                <n-switch v-model:value="clockConfigForm.flashing" :round="false" />
                            </n-form-item>
                            <n-form-item label="闪烁呼吸效果">
                                <n-switch
                                    v-model:value="clockConfigForm.splitTransition"
                                    :round="false"
                                    :disabled="!clockConfigForm.flashing"
                                />
                            </n-form-item>
                        </n-form>
                    </n-scrollbar>
                    <n-button type="success" block @click="handleSave">
                        <template #icon>
                            <n-icon>
                                <checkbox-icon />
                            </n-icon>
                        </template>
                        保存
                    </n-button>
                </n-gi>
            </n-grid>
        </n-layout-content>
    </n-layout>
</template>

<script lang="ts" setup>
import {
    Settings as SettingsIcon,
    X as XIcon,
    Checkbox as CheckboxIcon,
    Palette as PaletteIcon,
    Puzzle as PuzzleIcon,
} from "@vicons/tabler";
import { ref } from "vue";
import { cloneDeep, isEqual } from "lodash";
import { useDialog } from "naive-ui";
import type { SelectOption } from "naive-ui";
import { ipcRenderer } from "electron";
import { ipcCloseCurrentWindow, ipcReloadWindow } from "@/utils/ipcRenderer";
import Clock from "@/components/clock.vue";
import { StyleConfig, ClockConfig } from "@/types/clock";
import useSystemStore from "@/store/modules/system";

const dialog = useDialog();

const systemStore = useSystemStore();

const { styleConfig, clockConfig } = systemStore;
const styleConfigForm = ref<StyleConfig>(cloneDeep(styleConfig));
const clockConfigForm = ref<ClockConfig>(cloneDeep(clockConfig));

const handleClose = () => {
    const hasChanged =
        isEqual(styleConfig, styleConfigForm.value) && isEqual(clockConfig, clockConfigForm.value);
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
    systemStore.setStyleConfig(styleConfigForm.value);
    systemStore.setClockConfig(clockConfigForm.value);
    ipcCloseCurrentWindow();
    ipcReloadWindow();
};

const fontFamilyLoading = ref(true);
const fontSelectOptions = ref<SelectOption[]>([]);
ipcRenderer.on("get-font-list", (e, list: string[]) => {
    fontSelectOptions.value = list.map(item => {
        return {
            label: item,
            value: item,
            style: { fontFamily: item },
        };
    });
    fontFamilyLoading.value = false;
});
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

:deep(.n-layout .n-layout-scroll-container),
:deep(.n-scrollbar) {
    overflow: visible;
}

:deep(.n-scrollbar > .n-scrollbar-rail.n-scrollbar-rail--vertical) {
    right: -10px;
}
</style>
