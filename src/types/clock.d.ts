// 时钟相关定义

/** css相关设置参数定义 */
export interface StyleConfig {
    /** 文字颜色 */
    color: string;
    /** 文字大小 */
    fontSize: string;
    /** 字体 */
    fontFamily: string;
}

/** 其他设置参数定义 */
export interface ClockConfig {
    /** 闪烁效果 */
    flashing: boolean;
    /** 分隔符号过渡动画，呼吸效果 */
    splitTransition: boolean;
}
