import StoreUpdated, { UserInterface } from "./StoreUpdated.js";

import { isValidJSON } from "../utils.js";

const PING_INTERVAL = 10001;
let pingIntervalId: number | null = null;

const activeSockets: { [chatId: number]: WebSocket } = {};

const webSocketTransport = async (
  chatId: number,
  user: UserInterface,
  token: string,
): Promise<WebSocket | null> => {
  if (activeSockets[chatId] && activeSockets[chatId].readyState === WebSocket.OPEN) {
    return activeSockets[chatId];
  }

  const connectWebSocket = async (): Promise<WebSocket | null> => {
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token}`);

    const setupPing = () => {
      if (pingIntervalId !== null) clearInterval(pingIntervalId);
      pingIntervalId = setInterval(() => {
        socket.send(
          JSON.stringify({
            type: "ping",
          }),
        );
      }, PING_INTERVAL);
    };

    socket.addEventListener("open", () => {
      const existingMessages = StoreUpdated.getState().ChatPage.messages || [];
      if (existingMessages.length > 0) {
        StoreUpdated.set("ChatPage.messages", []);
      }
      setupPing();
      socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        }),
      );
    });

    socket.addEventListener("close", async (event) => {
      if (pingIntervalId !== null) clearInterval(pingIntervalId);
      delete activeSockets[chatId];

      if (!event.wasClean && event.code === 1006) {
        const newSocket = await connectWebSocket();
        if (newSocket) activeSockets[chatId] = newSocket;
      }
    });

    socket.addEventListener("message", (event) => {
      try {
        // console.log("Сообщение", event);
        if (isValidJSON(event.data)) {
          const data = JSON.parse(event.data);
          if (data.type !== "pong" && data.type !== "user connected") {
            const existingMessages = StoreUpdated.getState().ChatPage.messages || [];
            const newMessages = Array.isArray(data) ? data.reverse() : [data];
            StoreUpdated.set("ChatPage.messages", [...existingMessages, ...newMessages]);
            const zone = document.getElementById("message_chat");
            if (zone) zone.scrollTop = zone.scrollHeight + 30;
          }
        }
      } catch (e) {
        console.error("Ошибка обработки сообщения", e);
      }
    });

    socket.addEventListener("error", () => {
      console.error("Ошибка WebSocket соединения");
    });

    activeSockets[chatId] = socket;

    return socket;
  };

  return connectWebSocket();
};

export default webSocketTransport;
