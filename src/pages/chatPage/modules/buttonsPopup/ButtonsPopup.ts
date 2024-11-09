import Block from "../../../../globalClasses/Block";
import { ActionButton } from "../../partials/actionButton/ActionButton";
import { Overlay } from "../../../../components/overlay/Overlay";

import "./buttonsPopup.scss";
import { modalWindowAddUserSettings, modalWindowDeleteUserSettings } from "../../chatPageSettings";
import userApi from "../../../../api/userApi";
import chatsApi from "../../../../api/chatsApi";
import StoreUpdated from "../../../../globalClasses/StoreUpdated";

interface ActionButtonProps {
  icon: string;
  alt: string;
  label: string;
  id?: string;
}

interface ButtonsPopupProps {
  buttons: ActionButtonProps[];
  popupOpen?: boolean;
  isBottomLeft?: boolean;
  isTopRight?: boolean;
  buttonsPopupId?: string;
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
                  event.preventDefault();

                  const elem =
                    button.id === "add-user"
                      ? this.children.OverlayWithModalWindowAddUser
                      : this.children.OverlayWithModalWindowDeleteUser;

                  if (elem) {
                    elem.getContent().classList.toggle("hidden");
                  }
                },
              },
            }),
        ),
      ],
      OverlayWithModalWindowAddUser: new Overlay({
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
                  this.children.OverlayWithModalWindowAddUser.children.ModalWindow.children.FormField.setProps(
                    {
                      errorText: error,
                    },
                  );
                } else {
                  this.children.OverlayWithModalWindowAddUser.children.ModalWindow.children.FormField.setProps(
                    {
                      errorText: "",
                    },
                  );
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
                    this.children.OverlayWithModalWindowAddUser.children.ModalWindow.children.FormField.setProps(
                      {
                        errorText: "Пользователь не найден или уже присутствует в чате",
                      },
                    );
                  } else {
                    this.children.OverlayWithModalWindowAddUser.children.ModalWindow.children.FormField.setProps(
                      {
                        errorText: "",
                      },
                    );
                    const userIdByLogin = JSON.parse(request.response)[0].id;

                    const activeChatId = StoreUpdated.getState().ChatPage!.activeChatId;
                    if (!activeChatId) return;
                    const requestUsers = await chatsApi.getChatUsers(activeChatId);
                    if (requestUsers.status === 200) {
                      const usersInChat = JSON.parse(requestUsers.response);
                      const usersInChatIds = usersInChat.map((user: Record<string, unknown>) => user.id);

                      if (!usersInChatIds.includes(userIdByLogin)) {
                        const requestAddUser = await chatsApi.addUserToChat(userIdByLogin, activeChatId);
                        if (requestAddUser.status === 200) {
                          const elemModal = this.children.OverlayWithModalWindowAddUser.children.ModalWindow;
                          elemModal.setProps({
                            title: "Пользователь успешно добавлен",
                          });
                        } else {
                          const elemModal = this.children.OverlayWithModalWindowAddUser.children.ModalWindow;
                          elemModal.setProps({
                            title: "Ошибка добавления пользователя",
                          });
                        }
                      } else {
                        const elemModal = this.children.OverlayWithModalWindowAddUser.children.ModalWindow;
                        elemModal.setProps({
                          title: "Пользователь уже присутствует в чате",
                        });
                      }
                    }
                  }
                }
              } catch (error) {
                console.log(error);
              }
            }
          },
        },
        overlayEvents: {
          click: (event: Event) => {
            const target = event.target as HTMLElement;
            console.log("tut", target);
            if (target?.id === "modalOverlay") {
              target.classList.toggle("hidden");
              const elemModal = this.children.OverlayWithModalWindowAddUser.children.ModalWindow;
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
      OverlayWithModalWindowDeleteUser: new Overlay({
        ...modalWindowDeleteUserSettings,
        inputOptions: {
          ...modalWindowDeleteUserSettings.inputOptions,
          events: {
            blur: (event: Event) => {
              event.stopPropagation();
              event.preventDefault();
              if (modalWindowDeleteUserSettings.inputOptions.validation) {
                const error = modalWindowDeleteUserSettings.inputOptions.validation(
                  (event.target as HTMLInputElement).value,
                );
                if (error) {
                  this.children.OverlayWithModalWindowDeleteUser.children.ModalWindow.children.FormField.setProps(
                    {
                      errorText: error,
                    },
                  );
                } else {
                  this.children.OverlayWithModalWindowDeleteUser.children.ModalWindow.children.FormField.setProps(
                    {
                      errorText: "",
                    },
                  );
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
                    this.children.OverlayWithModalWindowDeleteUser.children.ModalWindow.children.FormField.setProps(
                      {
                        errorText: "Пользователь не найден или отсутствует в чате",
                      },
                    );
                  } else {
                    this.children.OverlayWithModalWindowDeleteUser.children.ModalWindow.children.FormField.setProps(
                      {
                        errorText: "",
                      },
                    );
                    const userIdByLogin = JSON.parse(request.response).find(
                      (user: Record<string, unknown>) => user.login === inputElement.value,
                    ).id;
                    console.log(userIdByLogin);

                    const activeChatId = StoreUpdated.getState().ChatPage!.activeChatId;
                    if (!activeChatId) return;
                    const requestUsers = await chatsApi.getChatUsers(activeChatId);
                    if (requestUsers.status === 200) {
                      const usersInChat = JSON.parse(requestUsers.response);
                      const usersInChatIds = usersInChat.map((user: Record<string, unknown>) => user.id);

                      console.log(usersInChatIds);

                      if (usersInChatIds.includes(userIdByLogin)) {
                        const requestAddUser = await chatsApi.deleteUserFromChat(userIdByLogin, activeChatId);
                        if (requestAddUser.status === 200) {
                          const elemModal =
                            this.children.OverlayWithModalWindowDeleteUser.children.ModalWindow;
                          elemModal.setProps({
                            title: "Пользователь успешно удален",
                          });
                        } else {
                          const elemModal =
                            this.children.OverlayWithModalWindowDeleteUser.children.ModalWindow;
                          elemModal.setProps({
                            title: "Ошибка удаления пользователя",
                          });
                        }
                      } else {
                        const elemModal = this.children.OverlayWithModalWindowDeleteUser.children.ModalWindow;
                        elemModal.setProps({
                          title: "Пользователь отсутствует в чате",
                        });
                      }
                    }
                  }
                }
              } catch (error) {
                console.log(error);
              }
            }
          },
        },
        overlayEvents: {
          click: (event: Event) => {
            const target = event.target as HTMLElement;
            console.log("tut", target);
            if (target?.id === "modalOverlay") {
              target.classList.toggle("hidden");
              const elemModal = this.children.OverlayWithModalWindowDeleteUser.children.ModalWindow;
              elemModal.setProps({
                title: "Удалить пользователя",
                inputOptions: {
                  ...modalWindowDeleteUserSettings.inputOptions,
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
        {{{ OverlayWithModalWindowAddUser }}}
        {{{ OverlayWithModalWindowDeleteUser }}}
      </div>
    `;
  }
}
