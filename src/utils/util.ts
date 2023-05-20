export class Util {
  /**
   * 将 JSON 字符串/字符串转换为 Map 对象
   *
   * @template K Map 对象的键的类型
   * @template V Map 对象的值的类型
   * @param {string|object} json 要转换的 JSON 字符串或Json 对象
   * @returns {Map<K, V>} 转换后的 Map 对象
   * @throws 当传入的 JSON 字符串格式不正确时，会抛出异常
   */
  public static jsonToMap<K extends PropertyKey, V>(json: string | object): Map<K, V> {
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

  /*
   * 生成随机颜色
   * @returns {string} 颜色值，如：#ffffff
   */
  public static generateColor(): string {
    // 随机生成色相
    const hue = Math.floor(Math.random() * 360);
    // 随机生成饱和度在50%~100%之间
    const saturation = Math.floor(Math.random() * 50) + 50;
    // 随机生成亮度在40%~90%之间
    const lightness = Math.floor(Math.random() * 40) + 50;

    // 将 HSL 转为 RGB
    const h = hue / 60;
    const s = saturation / 100;
    const l = lightness / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h % 2) - 1));
    const m = l - c / 2;
    let r, g, b;
    if (0 <= h && h < 1) {
      [r, g, b] = [c, x, 0];
    } else if (1 <= h && h < 2) {
      [r, g, b] = [x, c, 0];
    } else if (2 <= h && h < 3) {
      [r, g, b] = [0, c, x];
    } else if (3 <= h && h < 4) {
      [r, g, b] = [0, x, c];
    } else if (4 <= h && h < 5) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    // 将 RGB 转为十六进制
    const red = r.toString(16).padStart(2, "0");
    const green = g.toString(16).padStart(2, "0");
    const blue = b.toString(16).padStart(2, "0");

    return `#${red}${green}${blue}`;
  }
}