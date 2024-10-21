import { HTTPTransport } from "../globalClasses/api";

const loginAPIInstance = new HTTPTransport("auth");

class LoginApi {
  create(data: Record<string, string>): Promise<XMLHttpRequest> {
    return loginAPIInstance.post("/signin", {
      headers: { "Content-Type": "application/json", withCredentials: "true" },
      data: data,
    });
  }
}

export default new LoginApi();
