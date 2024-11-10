import { HTTPTransport } from "../globalClasses/api";

const profilePageGetUserAPIInstance = new HTTPTransport("auth/");
const profilePageChangeUserInfoAPIInstance = new HTTPTransport("user/profile");
const profilePageChangeUserPasswordAPIInstance = new HTTPTransport("user/password");

class ProfilePageApi {
  request(): Promise<XMLHttpRequest> {
    return profilePageGetUserAPIInstance.get("user");
  }

  changeAvatar(data: FormData): Promise<XMLHttpRequest> {
    return profilePageChangeUserInfoAPIInstance.put("/avatar", {
      data: data,
    });
  }

  changeUserInfo(data: Record<string, string>): Promise<XMLHttpRequest> {
    return profilePageChangeUserInfoAPIInstance.put("", {
      headers: { "Content-Type": "application/json", withCredentials: "true" },
      data: data,
    });
  }

  changeUserPassword(data: Record<string, string>): Promise<XMLHttpRequest> {
    return profilePageChangeUserPasswordAPIInstance.put("", {
      headers: { "Content-Type": "application/json", withCredentials: "true" },
      data: data,
    });
  }
}

export default new ProfilePageApi();
