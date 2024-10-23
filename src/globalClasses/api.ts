type HttpMethod = "GET" | "PUT" | "POST" | "DELETE";

interface QueryStringifyData {
  [key: string]: string | number | boolean | QueryStringifyData | Array<string | number>;
}

interface RequestOptions {
  headers?: Record<string, string>;
  data?: any;
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

export class HTTPTransport {
  protected baseURL = "https://ya-praktikum.tech/api/v2/";
  private basePath: string;
  constructor(pathForPage: string) {
    this.basePath = this.baseURL + pathForPage;
  }
  get(path: string, options: RequestOptions = {}): Promise<XMLHttpRequest> {
    const queryString = options.data ? queryStringify(options.data) : "";
    return this.request(
      `${this.basePath}${path}${queryString}`,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  }

  put(path: string, options: RequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(`${this.basePath}${path}`, { ...options, method: METHODS.PUT }, options.timeout);
  }

  post(path: string, options: RequestOptions = {}): Promise<XMLHttpRequest> {
    console.log(options);
    return this.request(`${this.basePath}${path}`, { ...options, method: METHODS.POST }, options.timeout);
  }

  delete(path: string, options: RequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(path, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  private request(
    path: string,
    options: RequestOptionsWithMethod,
    timeout: number = 5000,
  ): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, path);

      xhr.withCredentials = true;

      if (!(data instanceof FormData)) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(new Error(`Error while executing ${method} request to ${path}`));

      xhr.timeout = timeout;
      xhr.ontimeout = () => reject(new Error("Request timed out"));

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
