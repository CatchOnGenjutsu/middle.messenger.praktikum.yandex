import { HTTPTransport } from "../globalClasses/api";

const chatsGetChatsAPIInstance = new HTTPTransport("chats");

class ChatsApi {
  getChats() {
    return chatsGetChatsAPIInstance.get("");
  }

  createChat(title: string) {
    return chatsGetChatsAPIInstance.post("", {
      headers: { "Content-Type": "application/json", withCredentials: "true" },
      data: { title },
    });
  }

  getChatToken = async function (chatId: number) {
    return chatsGetChatsAPIInstance.post(`/token/${chatId}`);
  };

  getChatUsers(chatId: number) {
    return chatsGetChatsAPIInstance.get(`/${chatId}/users`);
  }

  addUserToChat(userId: number, chatId: number) {
    return chatsGetChatsAPIInstance.put(`/users`, {
      data: { users: [userId], chatId },
      headers: { "Content-Type": "application/json", withCredentials: "true" },
    });
  }

  deleteUserFromChat(userId: number, chatId: number) {
    return chatsGetChatsAPIInstance.delete(`/users`, {
      data: { users: [userId], chatId },
      headers: { "Content-Type": "application/json", withCredentials: "true" },
    });
  }
}

export default new ChatsApi();
