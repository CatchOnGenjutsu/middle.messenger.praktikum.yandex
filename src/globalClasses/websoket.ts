import chatsApi from "../api/chatsApi.js";
import StoreUpdated, { UserInterface } from "./StoreUpdated.js";

const webSocketTransport = async (chatId: number, user: UserInterface): Promise<WebSocket | null> => {
  console.log("webSocketTransport", chatId, user);
  const resp = await chatsApi.getChatToken(chatId);
  console.log("Token Response:", JSON.parse(resp.response));

  if (!resp) return null;

  if (!("token" in JSON.parse(resp.response))) return null;

  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${JSON.parse(resp.response).token}`,
  );

  socket.addEventListener("open", () => {
    StoreUpdated.set("messages", {
      messages: [],
    });

    const originalSend = socket.send.bind(socket);
    socket.send = (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
      console.log("Отправка сообщения через WebSocket:", data);
      originalSend(data);
    };

    socket.send(
      JSON.stringify({
        content: "0",
        type: "get old",
      }),
    );
  });

  socket.addEventListener("close", (event) => {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener("message", (event) => {
    console.log("Получены данные", event.data);

    try {
      const data = JSON.parse(event.data);

      StoreUpdated.set("messages", {
        messages: [...StoreUpdated.getState().messages, ...(Array.isArray(data) ? data.reverse() : [data])],
      });

      const zone = document.getElementById("message_chat");

      if (zone) {
        zone.scrollTop = zone?.scrollHeight + 30;
      }
    } catch (e) {
      console.error(e);
    }
  });

  socket.addEventListener("error", () => {
    console.log("Ошибка");
  });

  return socket;
};

export default webSocketTransport;
