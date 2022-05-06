import dayjs from "dayjs";

export function JSONStringify(obj: unknown): string {
  return JSON.stringify(obj, function (key, value) {
    if (typeof value === 'function') {
      return value.toString();
    } else if (value instanceof Date) {
      return value.valueOf();
    }
    return value;
  }, 2)
}

export function ParseJSON<T>(str: string): T {
  return JSON.parse(str, function (key, value) {
    if (key === 'date') {
      return dayjs(value).toDate();
    } else if (value.toString().includes('function')) {
      return eval(value);
    }
    return value;
  }) as T
}