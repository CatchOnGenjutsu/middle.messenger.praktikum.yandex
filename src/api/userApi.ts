import { HTTPTransport } from "../globalClasses/api";

const authAPIInstance = new HTTPTransport("auth/");
const userAPIInstance = new HTTPTransport("user/");

class userApi {
  request(): Promise<XMLHttpRequest> {
    return authAPIInstance.get("user");
  }

  findUserByLogin(login: string): Promise<XMLHttpRequest> {
    return userAPIInstance.post(`search`, {
      data: { login },
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default new userApi();
