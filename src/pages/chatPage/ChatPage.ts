import Block, { BlockProps } from "../../globalClasses/Block";
import StoreUpdated, { UserInterface } from "../../globalClasses/StoreUpdated";
import chatsApi from "../../api/chatsApi";

import CurrentChat from "./modules/currentChat/CurrentChat";
import ChatList from "./modules/chatList/ChatList";
import SearchInput from "./partials/searchInput/SearchInput";
import Button from "../../components/button/Button";

import { Overlay } from "../../components/overlay/Overlay";
import { ProfileLink } from "./partials/profileLink/profileLink";

import { ChatItemProps } from "./partials/chatItem/ChatItem";
import { IMessageBlockTestProps } from "./modules/messageBlockTest/messageBlockTest";

import {
  createChatButtonSettings,
  modalWindowAddChatSettings,
  profileLinkSettings,
} from "./chatPageSettings";

import { isEqual } from "../../utils";

import "./chatPage.scss";

export interface ChatPageProps extends BlockProps {
  overlaySettings?: Record<string, unknown>;
  chats?: ChatItemProps[] | [];
  activeChatId?: number | undefined;
  userInfo: UserInterface;
  messages?: IMessageBlockTestProps | [];
}

export default class ChatPage extends Block<ChatPageProps> {
  constructor(props: ChatPageProps) {
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
              elem.getContent().classList.toggle("hidden");
            }
          },
        },
      }),
      SearchInput: new SearchInput(),
      ChatsList: new ChatList(ChatPage.getChatsProps(props)),
      CurrentChat: new CurrentChat({
        currentChat: StoreUpdated.getState().ChatPage.currentChat as Record<string, unknown>,
        messages: ChatPage.getMessagesProps(props),
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
    return {
      chats: props.chats,
    };
  }

  static getMessagesProps(props: any): IMessageBlockTestProps {
    return {
      messages: props.messages,
    };
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    const { currentChat, messages, chats, socket } = newProps;

    if (
      !isEqual(oldProps.currentChat, currentChat) ||
      !isEqual(oldProps.messages, messages) ||
      !isEqual(oldProps.socket, socket)
    ) {
      this.children.CurrentChat.setProps({
        currentChat,
        messages: ChatPage.getMessagesProps(newProps),
      });
      return true;
    }

    if (!isEqual(oldProps.chats, chats)) {
      this.children.ChatsList.setProps(ChatPage.getChatsProps(newProps));
      return true;
    }

    return false;
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
