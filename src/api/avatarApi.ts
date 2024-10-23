import { HTTPTransport } from "../globalClasses/api";

const avatarAPIInstance = new HTTPTransport("user/profile");

class AvatarApi {
  create(data: FormData): Promise<XMLHttpRequest> {
    return avatarAPIInstance.put("/avatar", {
      // headers: ,
      data: data,
    });
  }
}

export default new AvatarApi();
