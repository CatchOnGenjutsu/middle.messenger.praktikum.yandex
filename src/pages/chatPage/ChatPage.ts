import Block from "../../globalClasses/Block";
import StoreUpdated from "../../globalClasses/StoreUpdated";
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
import { ChatItem, ChatItemProps } from "./partials/chatItem/ChatItem";
// import { ChatItemProps } from "./partials/chatItem/ChatItem";

interface ChatPageProps {
  overlaySettings: Record<string, unknown>;
  chats: ChatItemProps[] | [];
}

export default class ChatPage extends Block {
  constructor(props: ChatPageProps) {
    console.log(props);
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
      ChatList: [
        ...props.chats.map(
          (chat: ChatItemProps) =>
            new ChatItem({
              ...chat,
              events: {
                click: () => this.handleItemClick(chat.id),
              },
            }),
        ),
      ],
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
                // const reason = JSON.parse(request.response).reason;
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
        StoreUpdated.set("ChatPage.chats", data);
      }
    } catch (error) {
      console.error("Ошибка при получении информации о чатах:", error);
    }
  }

  // static getChatListsProps(props: any) {
  //   return {
  //     chats: props.chats,
  //   };
  // }

  private handleItemClick(chatId: number) {
    this.setProps({ activeChatId: chatId });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.chats !== newProps.chats) {
      // debugger;
      console.log("Чаты обновлены:", newProps.chats);
      this.lists.ChatList =
        newProps.chats!.map(
          (chat: ChatItemProps) =>
            new ChatItem({
              ...chat,
              events: {
                click: () => this.handleItemClick(chat.id),
              },
            }),
        ) || [];
      this.setProps({});
      return true;
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
        {{{ ChatList }}}
        <ul class="chat-list">
          {{#each lists.ChatList}}
            <li>{{{this}}}</li>
          {{/each}}
        </ul>
      </aside>
      <main>
        {{{ CurrentChat }}}
      </main>
      {{{ OverlayWithModalWindow }}}
    </div>
    `;
  }
}
