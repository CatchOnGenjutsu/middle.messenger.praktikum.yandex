type HttpMethod = "GET" | "PUT" | "POST" | "DELETE";

interface QueryStringifyData {
  [key: string]: string | number | boolean | QueryStringifyData | Array<string | number>;
}

interface RequestOptions {
  headers?: Record<string, string>;
  data?: QueryStringifyData;
  timeout?: number;
}

interface RequestOptionsWithMethod extends RequestOptions {
  method: HttpMethod;
}

const METHODS: Record<string, HttpMethod> = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

function queryStringify(data: QueryStringifyData): string {
  if (!data) {
    return "";
  }

  return `?${Object.entries(data)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.join(",")}`;
      }
      if (typeof value === "object") {
        return `${key}=${value.toString()}`;
      }
      return `${key}=${value}`;
    })
    .join("&")}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class HTTPTransport {
  get(url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> {
    const queryString = options.data ? queryStringify(options.data) : "";
    return this.request(`${url}${queryString}`, { ...options, method: METHODS.GET }, options.timeout);
  }

  put(url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  post(url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  delete(url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  private request(
    url: string,
    options: RequestOptionsWithMethod,
    timeout: number = 5000,
  ): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(new Error(`Error while executing ${method} request to ${url}`));

      xhr.timeout = timeout;
      xhr.ontimeout = () => reject(new Error("Request timed out"));

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create() {
    throw new Error("Not implemented");
  }

  request() {
    throw new Error("Not implemented");
  }

  update() {
    throw new Error("Not implemented");
  }

  delete() {
    throw new Error("Not implemented");
  }
}
