import Block, { BlockProps } from "../../globalClasses/Block";
import StoreUpdated, { UserInterface } from "../../globalClasses/StoreUpdated";
import chatsApi from "../../api/chatsApi";

import CurrentChat from "./modules/currentChat/CurrentChat";
import { Overlay } from "../../components/overlay/Overlay";
import SearchInput from "./partials/searchInput/SearchInput";
import { ProfileLink } from "./partials/profileLink/profileLink";

import { chatPageOpenSettings } from "./mockData";
import {
  createChatButtonSettings,
  modalWindowAddChatSettings,
  profileLinkSettings,
} from "./chatPageSettings";

import "./chatPage.scss";
import Button from "../../components/button/Button";
import { ChatItemProps } from "./partials/chatItem/ChatItem";
import ChatList from "./modules/chatList/ChatList";
import { isEqual } from "../../utils";
import webSocketTransport from "../../globalClasses/websoket";
// import { ChatItemProps } from "./partials/chatItem/ChatItem";

export interface ChatPageProps extends BlockProps {
  overlaySettings?: Record<string, unknown>;
  chats?: ChatItemProps[] | [];
  activeChatId?: number;
  userInfo: UserInterface;
}

export default class ChatPage extends Block {
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
              // StoreUpdated.set("ProfilePageState.newAvatar", null);
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

              if (request.status === 200) {
                elemModal.setProps({
                  title: "Чат успешно создан",
                });
                this.getChats();
              } else {
                elemModal.setProps({
                  title: "Чат не создан",
                });
              }
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

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    // console.log("ChatPage componentDidUpdate", oldProps, newProps);
    if (!isEqual(oldProps.chats || [], newProps.chats || [])) {
      // console.log("Чаты обновлены:", newProps.chats);
      this.children.ChatsList.setProps(ChatPage.getChatsProps(newProps));
      return true;
    }
    if (oldProps.activeChatId !== newProps.activeChatId && newProps.activeChatId) {
      // console.log("activeChatId обновлен:", newProps.activeChatId);
      webSocketTransport(newProps.activeChatId, newProps.userInfo)
        .then((instance) => {
          this.webSocketInstance = instance;
          console.log(instance);
          console.log(this.webSocketInstance);
          this.children.CurrentChat.setProps({ webSocketInstance: this.webSocketInstance });
        })
        .catch((error) => console.error("Ошибка при установке WebSocket:", error));
      return true;
      // this.children.CurrentChat.setProps({activeChatId: newProps.activeChatId});
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
