//生成指定范围随机数 [min,max]
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min); // 确保min是整数
    max = Math.floor(max); // 确保max是整数
    return Math.floor(Math.random() * (max - min + 1)) + min; // 返回介于min和max之间的整数
}