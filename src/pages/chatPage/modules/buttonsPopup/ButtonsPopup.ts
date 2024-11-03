import Block from "../../../../globalClasses/Block";
import { ActionButton } from "../../partials/actionButton/ActionButton";
import { Overlay } from "../../../../components/overlay/Overlay";

import "./buttonsPopup.scss";
import { modalWindowAddUserSettings } from "../../chatPageSettings";
import userApi from "../../../../api/userApi";
import chatsApi from "../../../../api/chatsApi";
import StoreUpdated from "../../../../globalClasses/StoreUpdated";

interface ActionButtonProps {
  icon: string;
  alt: string;
  label: string;
}

interface ButtonsPopupProps {
  buttons: ActionButtonProps[];
  popupOpen: boolean;
  isBottomLeft?: boolean;
  isTopRight?: boolean;
}

export class ButtonsPopup extends Block {
  constructor(props: ButtonsPopupProps) {
    super({
      ...props,
      Buttons: [
        ...props.buttons.map(
          (button) =>
            new ActionButton({
              ...button,
              events: {
                click: (event: Event) => {
                  event.stopPropagation();
                  const elem = this.children.OverlayWithModalWindow;
                  console.log(elem);
                  if (elem) {
                    elem.getContent().classList.toggle("hidden");
                  }
                },
              },
            }),
        ),
      ],
      OverlayWithModalWindow: new Overlay({
        ...modalWindowAddUserSettings,
        inputOptions: {
          ...modalWindowAddUserSettings.inputOptions,
          events: {
            blur: (event: Event) => {
              event.stopPropagation();
              event.preventDefault();
              if (modalWindowAddUserSettings.inputOptions.validation) {
                const error = modalWindowAddUserSettings.inputOptions.validation(
                  (event.target as HTMLInputElement).value,
                );
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
              try {
                const request = await userApi.findUserByLogin(inputElement.value);
                if (request.status === 200) {
                  if (request.response === "[]") {
                    this.children.OverlayWithModalWindow.children.ModalWindow.children.FormField.setProps({
                      errorText: "Пользователь не найден или уже присутствует в чате",
                    });
                  } else {
                    this.children.OverlayWithModalWindow.children.ModalWindow.children.FormField.setProps({
                      errorText: "",
                    });
                    const userIdByLogin = JSON.parse(request.response)[0].id;
                    console.log(userIdByLogin);
                    const activeChatId = StoreUpdated.getState().ChatPage!.activeChatId;
                    if (!activeChatId) return;
                    const requestUsers = await chatsApi.getChatUsers(activeChatId);
                    if (requestUsers.status === 200) {
                      const usersInChat = JSON.parse(requestUsers.response);
                      const usersInChatIds = usersInChat.map((user: Record<string, unknown>) => user.id);
                      console.log(usersInChatIds);
                      if (!usersInChatIds.includes(userIdByLogin)) {
                        const requestAddUser = await chatsApi.addUserToChat(userIdByLogin, activeChatId);
                        if (requestAddUser.status === 200) {
                          const elemModal = this.children.OverlayWithModalWindow.children.ModalWindow;
                          elemModal.setProps({
                            title: "Пользователь успешно добавлен",
                          });
                        } else {
                          const elemModal = this.children.OverlayWithModalWindow.children.ModalWindow;
                          elemModal.setProps({
                            title: "Ошибка добавления пользователя",
                          });
                        }
                      } else {
                        const elemModal = this.children.OverlayWithModalWindow.children.ModalWindow;
                        elemModal.setProps({
                          title: "Пользователь уже присутствует в чате",
                        });
                      }
                    }
                    const data = JSON.parse(request.response);
                    console.log(data);
                  }
                }
                console.log(request);
              } catch (error) {
                console.log(error);
              }
              // const request = Promise.resolve({ status: 200 });
              // const elemModal = this.children.OverlayWithModalWindow.children.ModalWindow;
              // elemModal.setProps({
              //   title: request.status === 200 ? "Пользователь успешно добавлен" : "Пользователь не добавлен",
              // });
              // if (request.status === 200) this.getChats();
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
                title: "Добавить пользователя",
                inputOptions: {
                  ...modalWindowAddUserSettings.inputOptions,
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
  }

  protected render(): string {
    return `
      <div class="buttons-popup {{#if popupOpen}}buttons-popup_active{{/if}} {{#if isTopRight}}buttons-popup_top-right{{/if}} {{#if isBottomLeft}}buttons-popup_bottom-left{{/if}}">
        {{{ Buttons }}}
        {{{ OverlayWithModalWindow }}}
      </div>
    `;
  }
}
