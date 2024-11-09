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

export function isEqual(lhs: unknown, rhs: unknown): boolean {
  if (lhs === rhs) {
    return true;
  }

  if ((isPlainObject(lhs) && isPlainObject(rhs)) || (isArray(lhs) && isArray(rhs))) {
    const lhsKeys = Object.keys(lhs);
    const rhsKeys = Object.keys(rhs);

    if (lhsKeys.length !== rhsKeys.length) {
      return false;
    }

    for (const key of lhsKeys) {
      const lhsValue = (lhs as PlainObject)[key];
      const rhsValue = (rhs as PlainObject)[key];

      if (isArrayOrObject(lhsValue) && isArrayOrObject(rhsValue)) {
        if (!isEqual(lhsValue, rhsValue)) {
          return false;
        }
      } else if (lhsValue !== rhsValue) {
        return false;
      }
    }

    return true;
  }

  return false;
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
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

export function isValidJSON(data: string): boolean {
  try {
    JSON.parse(data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
