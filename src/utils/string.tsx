export function padStrLeft(padStr: string, padNum: number, str: string) {
    while (str.length < padNum) {
        str = padStr.concat(str);
    }
    return str;
}
