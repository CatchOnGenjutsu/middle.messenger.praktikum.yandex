import chatsApi from "../api/chatsApi.js";
import StoreUpdated, { UserInterface } from "./StoreUpdated.js";

const PING_INTERVAL = 10000; // Отправка пинга каждые 10 секунд
let pingIntervalId: number | null = null;

const webSocketTransport = async (chatId: number, user: UserInterface): Promise<WebSocket | null> => {
  // const connectWebSocket = async (): Promise<WebSocket | null> => {
  const resp = await chatsApi.getChatToken(chatId);

  if (!resp || !("token" in JSON.parse(resp.response))) return null;

  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${JSON.parse(resp.response).token}`,
  );

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
    StoreUpdated.set("", { messages: [] });
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
    if (!event.wasClean) {
      if (event.code === 1006) {
        console.log("Обрыв соединения, выполняется переподключение...");
        // await connectWebSocket(); // Переподключение
      } else {
        console.log("Обрыв соединения");
      }
    } else {
      console.log("Соединение закрыто чисто");
    }
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  // Обработка сообщений
  socket.addEventListener("message", (event) => {
    console.log("Получены данные", event.data);
    try {
      const data = JSON.parse(event.data);
      StoreUpdated.set("", {
        messages: [...StoreUpdated.getState().messages, ...(Array.isArray(data) ? data.reverse() : [data])],
      });
      const zone = document.getElementById("message_chat");
      if (zone) zone.scrollTop = zone.scrollHeight + 30;
    } catch (e) {
      console.error(e);
    }
  });

  // Обработка ошибок
  socket.addEventListener("error", () => {
    console.error("Ошибка WebSocket соединения");
  });

  return socket;
  // };

  // return connectWebSocket(); // Инициализация подключения
};

export default webSocketTransport;
