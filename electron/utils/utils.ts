/** 通用方法 */

/** 判断是否为首次运行程序 */
export const isFirstLaunch = () => {
    return process.argv[1] === "--squirrel-firstrun";
};
