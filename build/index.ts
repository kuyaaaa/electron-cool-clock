/* eslint no-template-curly-in-string: "off" */
import * as builder from "electron-builder";
import chalk from "chalk";

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
            productName: "cool-clock",
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
                artifactName: "${productName}_${version}.${ext}",
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
        console.log(chalk.bgGreen(" BUILD SUCCESS "), "build files:");
        result.forEach(path => {
            console.log(chalk.underline(path));
        });
    })
    .catch(error => {
        // handle error
        console.error(chalk.bgRed(" BUILD ERROR "));
        console.error(chalk.red(error));
    });
