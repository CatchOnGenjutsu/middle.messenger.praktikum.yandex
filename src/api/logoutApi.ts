import { HTTPTransport } from "../globalClasses/api";

const logoutAPIInstance = new HTTPTransport("auth/");

class LogoutApi {
  request(): Promise<XMLHttpRequest> {
    return logoutAPIInstance.post("logout");
  }
}

export default new LogoutApi();
