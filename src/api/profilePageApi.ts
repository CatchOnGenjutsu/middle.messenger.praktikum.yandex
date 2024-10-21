import { HTTPTransport } from "../globalClasses/api";

const profilePageAPIInstance = new HTTPTransport("auth/");

class ProfilePageApi {
  request(): Promise<XMLHttpRequest> {
    return profilePageAPIInstance.get("user");
  }
}

export default new ProfilePageApi();
