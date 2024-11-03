import Block, { BlockProps } from "../../globalClasses/Block";
import StoreUpdated, { UserInterface } from "../../globalClasses/StoreUpdated";
import chatsApi from "../../api/chatsApi";

import CurrentChat from "./modules/currentChat/CurrentChat";
import ChatList from "./modules/chatList/ChatList";
import SearchInput from "./partials/searchInput/SearchInput";

import { Overlay } from "../../components/overlay/Overlay";
import { ProfileLink } from "./partials/profileLink/profileLink";

import { ChatItemProps } from "./partials/chatItem/ChatItem";

import webSocketTransport from "../../globalClasses/websocket";

import { chatPageOpenSettings } from "./mockData";

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
  activeChatId?: number | null;
  userInfo: UserInterface;
}

export default class ChatPage extends Block<ChatPageProps> {
  private webSocketInstance: WebSocket | null = null;
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
      CurrentChat: new CurrentChat({ ...chatPageOpenSettings }),
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

  private onMessage = (event: MessageEvent) => {
    // console.log("Получены данные", event.data);
    const data = JSON.parse(event.data);
    StoreUpdated.set("", {
      messages: [...StoreUpdated.getState().messages, ...(Array.isArray(data) ? data.reverse() : [data])],
    });
  };

  private onClose = (event: CloseEvent) => {
    console.log("Соединение закрыто", event.wasClean ? "чисто" : "с ошибкой");
  };

  private onError = () => {
    console.error("Ошибка WebSocket соединения");
  };
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

  async getChatToken(chatId: number): Promise<void> {
    try {
      const request = await chatsApi.getChatToken(chatId);
      if (request.status === 200) {
        const data = JSON.parse(request.response);
        console.log(data);
        // this.setProps({ activeChatId: chatId });
        // StoreUpdated.set("ChatPage.activeChatId", chatId);
      }
    } catch (error) {
      console.error("Ошибка при получении информации о чатах:", error);
    }
  }
  static getChatsProps(props: any) {
    // console.log("getChatsProps", props.chats);
    return {
      chats: props.chats,
    };
  }

  private setupWebSocketEvents(instance: WebSocket) {
    instance.addEventListener("message", this.onMessage);
    instance.addEventListener("close", this.onClose);
    instance.addEventListener("error", this.onError);

    this.children.CurrentChat.setProps({
      webSocketInstance: instance,
      activeChatId: this.props.activeChatId,
      userInfo: this.props.userInfo,
    });
  }

  private closeWebSocketInstance() {
    if (this.webSocketInstance) {
      this.webSocketInstance.removeEventListener("message", this.onMessage);
      this.webSocketInstance.removeEventListener("close", this.onClose);
      this.webSocketInstance.removeEventListener("error", this.onError);
      this.webSocketInstance.close();
      this.webSocketInstance = null;
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    // console.log("ChatPage componentDidUpdate", oldProps, newProps);
    if (!isEqual(oldProps.chats || [], newProps.chats || [])) {
      // console.log("Чаты обновлены:", newProps.chats);
      this.children.ChatsList.setProps(ChatPage.getChatsProps(newProps));
      return true;
    }
    if (oldProps.activeChatId !== newProps.activeChatId && newProps.activeChatId) {
      // Проверка на активное соединение
      if (this.webSocketInstance && this.webSocketInstance.readyState === WebSocket.OPEN) {
        const customWebSocket = this.webSocketInstance as any; // Приведение типа

        if (customWebSocket.activeChatId === newProps.activeChatId) {
          return false; // Нет необходимости переподключаться
        }

        // Закрываем предыдущее соединение, если оно для другого чата
        this.closeWebSocketInstance();
      }

      // Инициализация нового соединения
      webSocketTransport(newProps.activeChatId, newProps.userInfo)
        .then((instance) => {
          if (instance) {
            this.webSocketInstance = instance;
            this.setupWebSocketEvents(this.webSocketInstance);
          } else {
            console.error("Не удалось установить WebSocket соединение, возвращен null.");
          }
        })
        .catch((error) => console.error("Ошибка при установке WebSocket:", error));

      return true; // Возвращаем true, чтобы показать, что обновление произошло
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
