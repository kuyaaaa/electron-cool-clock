import * as builder from "electron-builder";

const { Platform } = builder;

// Promise is returned
// example: https://www.electron.build/api/programmatic-usage
builder
    .build({
        // ⭐ here to change build win or mac.
        // there only build for win.
        targets: Platform.WINDOWS.createTarget(),
        config: {
            appId: "com.electron.desktop",
            productName: "ElectronVueVite",
            asar: true,
            copyright: "Copyright © 2022 ZhuShiJun",
            directories: {
                output: "release/local",
            },
            files: ["dist"],
            win: {
                target: [
                    {
                        target: "nsis",
                        arch: ["x64"],
                    },
                ],
            },
            nsis: {
                oneClick: false,
                perMachine: false,
                allowToChangeInstallationDirectory: true,
                deleteAppDataOnUninstall: false,
            },
        },
    })
    .then(result => {
        // handle result
        console.log(result);
    })
    .catch(error => {
        // handle error
        console.error("------------------------------BUILD ERROR------------------------------");
        console.error(error);
    });
