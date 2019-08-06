/**
 * 去除字符串前后引号
 * @param {*} str 
 */
export function removeDoubleQuotes(str) {
    return str.replace(/\"/g, "")
}