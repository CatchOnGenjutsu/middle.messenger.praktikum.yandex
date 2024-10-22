function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}
export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  // Сравнение количества ключей объектов и массивов
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      // Здесь value и rightValue может быть только массивом или объектом
      // И TypeScript это обрабатывает
      if (isEqual(value as PlainObject, rightValue as PlainObject)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function deepCopy<T>(object: T, seen = new WeakMap()): T {
  if (object === null || typeof object !== "object") {
    return object;
  }

  if (seen.has(object)) {
    return seen.get(object);
  }

  if (object instanceof Date) {
    return new Date(object.getTime()) as T;
  }

  if (Array.isArray(object)) {
    const copy: any[] = [];
    seen.set(object, copy);
    for (const item of object) {
      copy.push(deepCopy(item, seen));
    }
    return copy as T;
  }

  if (object instanceof Map) {
    const copy = new Map();
    seen.set(object, copy);
    for (const [key, value] of object.entries()) {
      copy.set(deepCopy(key, seen), deepCopy(value, seen));
    }
    return copy as T;
  }

  if (object instanceof Set) {
    const copy = new Set();
    seen.set(object, copy);
    for (const item of object) {
      copy.add(deepCopy(item, seen));
    }
    return copy as T;
  }

  const copy: { [key: string]: any } = {};
  seen.set(object, copy);

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      copy[key] = deepCopy((object as { [key: string]: any })[key], seen);
    }
  }

  return copy as T;
}

export function set(obj: Record<string, any>, path: string, value: unknown) {
  const keys = path.split("."); // Разбиваем строку пути на массив ключей
  let current = obj;

  // Идем по ключам, создавая объекты на каждом уровне, если их нет
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {}; // Создаем пустой объект, если ключа нет
    }
    current = current[key];
  }

  // Устанавливаем значение в конечный ключ
  current[keys[keys.length - 1]] = value;
}
