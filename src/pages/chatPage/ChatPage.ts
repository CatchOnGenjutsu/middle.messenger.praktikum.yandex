import Block from "../../globalClasses/Block";
import StoreUpdated from "../../globalClasses/StoreUpdated";
import chatsApi from "../../api/chatsApi";

import ChatList from "./modules/chatList/ChatList";
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

export default class ChatPage extends Block {
  constructor(props: any) {
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
      ChatList: new ChatList(),
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
            // const file = this.props.newAvatar;
            // if (!(file instanceof File)) {
            //   const elem = this.children.OverlayWithModalWindow.children.ModalWindow.children.FileInputGroup;
            //   elem.setProps({
            //     errorText: "Файл не выбран",
            //   });
            // } else {
            //   const formData = new FormData();
            //   formData.append("avatar", file);
            //   const request = await profilePageApi.changeAvatar(formData);
            //   console.log(request);
            //   const elemModal = this.children.OverlayWithModalWindow.children.ModalWindow;
            //   if (request.status === 200) {
            //     elemModal.setProps({
            //       title: "Аватар успешно обновлен",
            //     });
            //     this.getUserInfo();
            //   } else {
            //     elemModal.setProps({
            //       title: "Ошибка, попробуйте ещё раз",
            //     });
            //   }
            // }
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
        console.log(data);
        StoreUpdated.set("ChatPage.chats", data);
      }
    } catch (error) {
      console.error("Ошибка при получении информации о чатах:", error);
    }
  }

  protected render(): string {
    return `
    <div class="chat-page" id="chat-page">
      <aside class="chat-page__aside">
        {{{ ProfileLink }}}
        {{{ CreateChatBtn }}}
        {{{ SearchInput }}}
        {{{ ChatList }}}
      </aside>
      <main>
        {{{ CurrentChat }}}
      </main>
      {{{ OverlayWithModalWindow }}}
    </div>
    `;
  }
}
