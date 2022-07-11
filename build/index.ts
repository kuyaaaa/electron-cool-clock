/* eslint no-template-curly-in-string: "off" */
import * as builder from "electron-builder";
import chalk from "chalk";
import { env as PROCESS_ENV } from "process";

const { Platform } = builder;

// Promise is returned
// example: https://www.electron.build/api/programmatic-usage
builder
    .build({
        config: {
            appId: "com.electron.desktop",
            productName: PROCESS_ENV.npm_package_name,
            asar: true,
            copyright: "Copyright © 2022 ZhuShiJun",
            directories: {
                output: "release/local",
            },
            files: ["dist"],
            win: {
                icon: "/public/favicon-256.ico",
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
