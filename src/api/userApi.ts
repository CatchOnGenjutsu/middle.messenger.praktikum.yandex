import { HTTPTransport } from "../globalClasses/api";

const userAPIInstance = new HTTPTransport("auth/");

class ProfilePageApi {
  request(): Promise<XMLHttpRequest> {
    return userAPIInstance.get("user");
  }
}

export default new ProfilePageApi();
