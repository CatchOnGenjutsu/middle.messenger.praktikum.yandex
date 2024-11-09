import { HTTPTransport } from "../globalClasses/api";

const registrationAPIInstance = new HTTPTransport("auth");

class RegistrationApi {
  create(data: Record<string, string>): Promise<XMLHttpRequest> {
    return registrationAPIInstance.post("/signup", {
      headers: { "Content-Type": "application/json", withCredentials: "true" },
      data: data,
    });
  }
}

export default new RegistrationApi();
