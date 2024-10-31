import { HTTPTransport } from "../globalClasses/api";

const chatsGetChatsAPIInstance = new HTTPTransport("chats");

class ChatsApi {
  getChats() {
    return chatsGetChatsAPIInstance.get("");
  }

  createChat(title: string) {
    return chatsGetChatsAPIInstance.post("", {
      // headers: { "Content-Type": "application/json", withCredentials: "true" },
      data: { title },
    });
  }

  getChatToken(chatId: number) {
    return chatsGetChatsAPIInstance.post(`/token/${chatId}`);
  }
}

export default new ChatsApi();
