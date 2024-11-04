import chatsApi from "../api/chatsApi.js";
import StoreUpdated, { UserInterface } from "./StoreUpdated.js";

const PING_INTERVAL = 10001; // Отправка пинга каждые 10 секунд
let pingIntervalId: number | null = null;

const activeSockets: { [chatId: number]: WebSocket } = {};

const webSocketTransport = async (
  chatId: number,
  user: UserInterface,
  token: string,
): Promise<WebSocket | null> => {
  // debugger;
  // Проверка на уже существующее соединение для этого chatId
  if (activeSockets[chatId] && activeSockets[chatId].readyState === WebSocket.OPEN) {
    return activeSockets[chatId]; // Возвращаем уже существующий WebSocket
  }

  const connectWebSocket = async (): Promise<WebSocket | null> => {
    // debugger;

    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token}`);

    // Обработчик для отправки сообщений (включая пинг)
    const setupPing = () => {
      if (pingIntervalId !== null) clearInterval(pingIntervalId); // Очистка предыдущего интервала
      pingIntervalId = setInterval(() => {
        socket.send(
          JSON.stringify({
            type: "ping",
          }),
        );
      }, PING_INTERVAL);
    };

    // Установка соединения
    socket.addEventListener("open", () => {
      StoreUpdated.set("ChatPage", { messages: [] });
      setupPing();
      socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        }),
      );
    });

    // Обработка закрытия
    socket.addEventListener("close", async (event) => {
      if (pingIntervalId !== null) clearInterval(pingIntervalId); // Остановка пинга при закрытии
      delete activeSockets[chatId]; // Удаляем запись при закрытии соединения

      // if (!event.wasClean && event.code === 1006) {
      //   // Выполняем переподключение при обрыве
      //   // const newSocket = await connectWebSocket();
      //   if (newSocket) activeSockets[chatId] = newSocket;
      // }
    });

    // Обработка сообщений
    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type !== "pong") {
          StoreUpdated.set("ChatPage", {
            messages: [
              ...StoreUpdated.getState().ChatPage.messages,
              ...(Array.isArray(data) ? data.reverse() : [data]),
            ],
          });
          const zone = document.getElementById("message_chat");
          if (zone) zone.scrollTop = zone.scrollHeight + 30;
        }
      } catch (e) {
        console.error("Ошибка обработки сообщения", e);
      }
    });

    // Обработка ошибок
    socket.addEventListener("error", () => {
      console.error("Ошибка WebSocket соединения");
    });

    activeSockets[chatId] = socket; // Сохраняем WebSocket в объекте

    return socket;
  };

  return connectWebSocket();
};

export default webSocketTransport;
