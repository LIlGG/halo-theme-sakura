/**
 * 将 JSON 字符串/字符串转换为 Map 对象
 *
 * @template K Map 对象的键的类型
 * @template V Map 对象的值的类型
 * @param {string|object} json 要转换的 JSON 字符串或Json 对象
 * @returns {Map<K, V>} 转换后的 Map 对象
 * @throws 当传入的 JSON 字符串格式不正确时，会抛出异常
 */
export function jsonToMap<K extends PropertyKey, V>(json: string|object): Map<K, V> {
  try {
    let obj = json;
    if (json instanceof String) {
      obj = JSON.parse(json.toString()) as Record<K, V>;
    }
    const entries = Object.entries(obj) as Array<[K, V]>;
    return new Map(entries);
  } catch (error: any) {
    throw new Error(`解析 JSON 失败：${error.message}`);
  }
}