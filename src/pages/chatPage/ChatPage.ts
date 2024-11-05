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

  static getChatsProps(props: any) {
    // console.log("getChatsProps", props.chats);
    return {
      chats: props.chats,
    };
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (!isEqual(oldProps.currentChat, newProps.currentChat)) {
      this.children.CurrentChat.setProps({ currentChat: newProps.currentChat });
      return true;
    }
    if (!isEqual(oldProps.chats || [], newProps.chats || [])) {
      this.children.ChatsList.setProps(ChatPage.getChatsProps(newProps));
    }

    if (!isEqual(oldProps.currentChat, newProps.currentChat)) {
      this.children.CurrentChat.setProps({ ...newProps.currentChat });
    }
    if (!isEqual(oldProps.messages || [], newProps.messages || [])) {
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
