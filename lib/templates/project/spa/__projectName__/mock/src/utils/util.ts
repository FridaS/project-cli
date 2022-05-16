/**
 * 截取特定长度的字符串，其中中文占2个长度单位，英文等占1个长度单位
 * @param {String} str 目标字符串
 * @param {Number} n 截取长度
 * @returns {String} 截取了的字符串
 */
export function substr (str: string, n: number): string {
  // var r = /[^\x00-\xff]/g
  if (length(str) <= n) {
    return str;
  }
  const m = Math.floor(n / 2);
  for (let i = m; i <= str.length; i++) {
    if (length(str.substring(0, i + 1)) > n) {
      return str.substring(0, i);
    }
  }
  return str;
}

/**
 * 字符串长度，其中中文占2个长度单位，英文等占1个长度单位
 * @param {String} str 目标字符串
 * @returns {Number} 字符串长度（其中中文占2个长度单位，英文等占1个长度单位）
 */
export function length (str: string): number {
  // eslint-disable-next-line no-control-regex
  const r = /[^\x00-\xff]/g;
  return str.replace(r, 'mm').length;
}

// 类型判断， 同typeof
export function typeOf(o: unknown) {
  return o === null 
    ? 'null'
    : Array.isArray(o)
      ? 'array'
      : typeof o;
}

export function clone<T>(obj: T): T {
  const type = typeOf(obj);
  switch (type) {
  case 'object': {
    const cloned: { [key: string]: any } = {};
    for (const i in obj) {
      cloned[i] = clone(obj[i]);
    }
    return (cloned as T);
  }
  case 'array':
    return ((obj as unknown as unknown[]).map(clone) as unknown as T);
  default:
    return obj;
  }
}

type Many<T> = T | ReadonlyArray<T>;
// 将二维或多维数组平铺
export function arrFlatten<T>(arr: Many<T>[]): T[] {
  const flatArr: Many<T>[] | T[] = [];
  flatArr.concat(...arr);
  return isMultMaxtix(flatArr)
    ? arrFlatten(flatArr) 
    : flatArr;
  function isMultMaxtix(list: Many<T>[] | T[]): list is Many<T>[] {
    return flatArr.some(item => Array.isArray(item));
  }
}

/**
 * 随机生成颜色
 * @param {Number} min 限制最小值，默认不限制
 */
export function randomColor({ min = 0 }: { min: number }) {
  const base = 256 - min;
  const r = Math.floor(Math.random() * base + min);
  const g = Math.floor(Math.random() * base + min);
  const b = Math.floor(Math.random() * base + min);  
  return `rgb(${r},${g},${b})`;
}

/**
* 获取文本px宽度
* @param {String} text 待计算宽度px大小的文本
* @param {String} font 字体样式，默认为'normal 14px PingFangSC-Regular'
**/
// export function textPxWidth(text, font = 'normal 14px PingFangSC-Regular') {
export function textPxWidth(text: string, font = 'normal 14px sans-serif') {
  // re-use canvas object for better performance
  const canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'); 
  // context.font = 
  //   'normal 14px HiraginoSansGB-W3, Arial, sans-serif, PingFangSC-Regular';
  if (context) {
    context.font = font;
    const metrics = context.measureText(text); 
    return metrics.width;
  }
  return NaN;
}

/**
 * 按指定分隔符将字符串转变为键值对对象
 * @param str，目标字符串
 * @param separate1，转换为数组的分隔符
 * @param separate2，转换为对象的分隔符
 * @return {Object}
 */
export function stringToObject (
  str: string, 
  separate1: string, 
  separate2: string,
): { [key: string]: string} {
  const arr = str.split(separate1);
  const result: { [key: string]: string} = {};
  arr.forEach((item: string) => {
    const itemArr = item.split(separate2);
    result[itemArr[0]] = itemArr[1];
  });
  return result;
}

/**
 * 获取给定url的search中的参数
 * @param url 目标url
 * @param key 想要的参数的key
 * @param all 是否想要全部参数，如果是，返回
 * @return {Object} 返回全部参数
 * @return {String} 返回单个参数
 */
export function getUrlParams (
  url: string, 
  key: string, 
  all?: undefined,
): object | null | string {
  if (!url) {
    return null;
  }

  const search = url.split('?')[1];
  if (!search) {
    return null;
  }

  const paramsObj = stringToObject(search, '&', '=');
  if (all) {
    return paramsObj;
  }
  return paramsObj[key];
}

/**
 * 在给定的对象中，根据value找到其key
 * @param {Object} data 目标对象
 * @param {Any} value 想要寻找的value
 * @param {Function} compare 自定义寻找规则、默认为寻找等于该value的项的key
 * @return {String} 与该value满足compare规则的项的key
 */
export function findKeyByValue (
  data: { [x: string]: any; }, 
  value: any, 
  compare: Function = (a: any,b: any) => a === b,
): string | undefined {
  return Object.keys(data).find(k => compare(data[k], value));
}

/**
 * 验证密码
 * 规则：长度为8~14个字符，字母/数字以及特殊符号至少包含两种组合
 * @param {String} str 密码字符串
 * @return {Boolean} 是否通过验证
 */
export function validatePassword(str: string): boolean {
  // 字母+数字，字母+特殊字符，数字+特殊字符
  const reg = new RegExp(
    '(?![a-zA-z]+$)'
    + '(?!\\d+$)' 
    + '(?![`!$^()_<>?:",./;\\\\[\\]·~！@#￥%……&*（）—\\-+={}|《》？：“”【】、；‘\'，。]+$)' 
    + '[a-zA-Z\\d`!$^()_<>?:",./;\\\\[\\]·~！@#￥%……&*（）—\\-+={}|《》？：“”【】、；‘\'，。]'
    + '{8,14}',
  );
  return reg.test(str);
}