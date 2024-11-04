import Block, { BlockProps } from "../../globalClasses/Block";
import StoreUpdated, { UserInterface } from "../../globalClasses/StoreUpdated";
import chatsApi from "../../api/chatsApi";

import CurrentChat, { CurrentChatProps } from "./modules/currentChat/CurrentChat";
import ChatList from "./modules/chatList/ChatList";
import SearchInput from "./partials/searchInput/SearchInput";

import { Overlay } from "../../components/overlay/Overlay";
import { ProfileLink } from "./partials/profileLink/profileLink";

import { ChatItemProps } from "./partials/chatItem/ChatItem";

// import webSocketTransport from "../../globalClasses/websocket";

import {
  createChatButtonSettings,
  modalWindowAddChatSettings,
  profileLinkSettings,
} from "./chatPageSettings";

import "./chatPage.scss";
import Button from "../../components/button/Button";

import { isEqual } from "../../utils";

export interface ChatPageProps extends BlockProps {
  overlaySettings?: Record<string, unknown>;
  chats?: ChatItemProps[] | [];
  activeChatId?: number | undefined;
  userInfo: UserInterface;
}

export default class ChatPage extends Block<ChatPageProps> {
  // private webSocketInstance: WebSocket | null = null;
  constructor(props: ChatPageProps) {
    // console.log("Проверка props:", props);
    super({
      ...props,
      ProfileLink: new ProfileLink({ ...profileLinkSettings }),
      CreateChatBtn: new Button({
        ...createChatButtonSettings,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            const elem = this.children.OverlayWithModalWindow;
            if (elem) {
              // StoreUpdated.set("ChatPageState.OverlayWithModalWindow", elem);
              elem.getContent().classList.toggle("hidden");
            }
          },
        },
      }),
      SearchInput: new SearchInput(),
      ChatsList: new ChatList(ChatPage.getChatsProps(props)),
      CurrentChat: new CurrentChat({
        currentChat: StoreUpdated.getState().ChatPage.currentChat as CurrentChatProps,
      }),
      OverlayWithModalWindow: new Overlay({
        ...modalWindowAddChatSettings,
        inputOptions: {
          ...modalWindowAddChatSettings.inputOptions,
          events: {
            blur: (event: Event) => {
              event.stopPropagation();
              event.preventDefault();
              if (modalWindowAddChatSettings.inputOptions.validation) {
                const error = modalWindowAddChatSettings.inputOptions.validation(
                  (event.target as HTMLInputElement).value,
                );
                console.log(error);
                if (error) {
                  this.children.OverlayWithModalWindow.children.ModalWindow.children.FormField.setProps({
                    errorText: error,
                  });
                } else {
                  this.children.OverlayWithModalWindow.children.ModalWindow.children.FormField.setProps({
                    errorText: "",
                  });
                }
              }
            },
          },
        },
        events: {
          submit: async (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            const inputElement = (event.target as HTMLFormElement).querySelector("input") as HTMLInputElement;
            if (inputElement) {
              inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
            }
            if (inputElement.value) {
              const request = await chatsApi.createChat(inputElement.value);
              const elemModal = this.children.OverlayWithModalWindow.children.ModalWindow;

              elemModal.setProps({
                title: request.status === 200 ? "Чат успешно создан" : "Чат не создан",
              });
              if (request.status === 200) this.getChats();
            }
          },
        },
        overlayEvents: {
          click: (event: Event) => {
            const target = event.target as HTMLElement;
            if (target?.id === "modalOverlay") {
              target.classList.toggle("hidden");
              const elemModal = this.children.OverlayWithModalWindow.children.ModalWindow;
              elemModal.setProps({
                title: "Создать чат",
                inputOptions: {
                  ...modalWindowAddChatSettings.inputOptions,
                  errorText: "",
                },
              });
              elemModal.children.FormField.setProps({ errorText: "" });
              elemModal.getContent().querySelector("form")?.reset();
            }
          },
        },
      }),
    });
    this.getChats();
  }

  // private onMessage = (event: MessageEvent) => {
  //   // console.log("Получены данные", event.data);
  //   const data = JSON.parse(event.data);
  //   StoreUpdated.set("ChatPage", {
  //     messages: [
  //       ...StoreUpdated.getState().ChatPage.messages,
  //       ...(Array.isArray(data) ? data.reverse() : [data]),
  //     ],
  //   });
  // };

  // private onClose = (event: CloseEvent) => {
  //   console.log("Соединение закрыто", event.wasClean ? "чисто" : "с ошибкой");
  // };

  // private onError = () => {
  //   console.error("Ошибка WebSocket соединения");
  // };
  async getChats(): Promise<void> {
    try {
      const request = await chatsApi.getChats();
      if (request.status === 200) {
        const data = JSON.parse(request.response);
        this.setProps({ chats: data });
        StoreUpdated.set("ChatPage.chats", data);
      }
    } catch (error) {
      console.error("Ошибка при получении информации о чатах:", error);
    }
  }

  // async getChatToken(chatId: number): Promise<string | null> {
  //   try {
  //     const request = await chatsApi.getChatToken(chatId);
  //     if (request.status === 200) {
  //       const data = JSON.parse(request.response);
  //       console.log(data);
  //       return data.token;
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при получении информации о чатах:", error);
  //     return null;
  //   }
  // }

  static getChatsProps(props: any) {
    // console.log("getChatsProps", props.chats);
    return {
      chats: props.chats,
    };
  }

  // private setupWebSocketEvents(instance: WebSocket) {
  //   instance.addEventListener("message", this.onMessage);
  //   instance.addEventListener("close", this.onClose);
  //   instance.addEventListener("error", this.onError);

  //   this.children.CurrentChat.setProps({
  //     webSocketInstance: instance,
  //     activeChatId: this.props.activeChatId,
  //     userInfo: this.props.userInfo,
  //   });
  // }

  // private closeWebSocketInstance() {
  //   if (this.webSocketInstance) {
  //     this.webSocketInstance.removeEventListener("message", this.onMessage);
  //     this.webSocketInstance.removeEventListener("close", this.onClose);
  //     this.webSocketInstance.removeEventListener("error", this.onError);
  //     this.webSocketInstance.close();
  //     this.webSocketInstance = null;
  //   }
  // }

  // async updateWebSocketConnection(chatId: number, userInfo: UserInterface, token: string) {
  //   // Закрываем предыдущее соединение, если оно уже существует
  //   if (this.webSocketInstance) {
  //     this.closeWebSocketInstance();
  //   }

  //   try {
  //     // Инициализация нового соединения
  //     const instance = await webSocketTransport(chatId, userInfo, token);

  //     if (instance) {
  //       this.webSocketInstance = instance;
  //       this.setupWebSocketEvents(this.webSocketInstance);
  //       return;
  //     } else {
  //       console.error("Не удалось установить WebSocket соединение, возвращен null.");
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при установке WebSocket:", error);
  //   }
  // }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    // if (oldProps.activeChatId !== newProps.activeChatId && newProps.activeChatId) {
    //   console.log("Запрос токена для chatId:", newProps.activeChatId);

    //   // Вызываем getChatToken и обрабатываем промис с помощью then
    //   this.getChatToken(newProps.activeChatId)
    //     .then((token) => {
    //       console.log("Получен токен для chatId:", newProps.activeChatId, token);

    //       // Проверяем токен
    //       if (!token) {
    //         console.error("Не удалось получить токен.");
    //         return null; // Возвращаем null, если токен не получен
    //       }

    //       // Устанавливаем WebSocket соединение
    //       this.updateWebSocketConnection(newProps.activeChatId, newProps.userInfo, token);
    //     })
    //     .catch((error) => {
    //       console.error("Ошибка при получении токена:", error);
    //     });

    //   return true; // Возвращаем true для обновления
    // }
    if (!isEqual(oldProps.chats || [], newProps.chats || [])) {
      this.children.ChatsList.setProps(ChatPage.getChatsProps(newProps));
      return true;
    }

    // if (oldProps.activeChatId !== newProps.activeChatId && newProps.activeChatId) {
    //   // Проверка, что WebSocket неактивен или активное соединение для другого чата
    //   if (this.webSocketInstance && this.webSocketInstance.readyState === WebSocket.OPEN) {
    //     const customWebSocket = this.webSocketInstance as any;

    //     if (customWebSocket.activeChatId === newProps.activeChatId) {
    //       return false; // Нет необходимости переподключаться
    //     }

    //     // Закрываем предыдущее соединение, если оно для другого чата
    //     this.closeWebSocketInstance();
    //   }

    //   // Инициализация нового соединения только если activeChatId изменился
    //   webSocketTransport(newProps.activeChatId, newProps.userInfo)
    //     .then((instance) => {
    //       if (instance) {
    //         this.webSocketInstance = instance;
    //         this.setupWebSocketEvents(this.webSocketInstance);
    //       } else {
    //         console.error("Не удалось установить WebSocket соединение, возвращен null.");
    //       }
    //     })
    //     .catch((error) => console.error("Ошибка при установке WebSocket:", error));

    //   return true;
    // }

    if (!isEqual(oldProps.currentChat, newProps.currentChat)) {
      this.children.CurrentChat.setProps({ ...newProps.currentChat });
    }
    if (!isEqual(oldProps.messages || [], newProps.messages || [])) {
      console.log("Messages обновлен", newProps.messages);
      this.children.CurrentChat.setProps({ messages: newProps.messages });
    }

    return true;
  }

  protected render(): string {
    return `
    <div class="chat-page" id="chat-page">
      <aside class="chat-page__aside">
        {{{ ProfileLink }}}
        {{{ CreateChatBtn }}}
        {{{ SearchInput }}}
        {{{ ChatsList }}}
      </aside>
      <main>
        {{{ CurrentChat }}}
      </main>
      {{{ OverlayWithModalWindow }}}
    </div>
    `;
  }
}
