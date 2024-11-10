import Block, { BlockProps } from "../../globalClasses/Block";
import Router from "../../globalClasses/Router";
import store from "../../globalClasses/Store";
import StoreUpdated from "../../globalClasses/StoreUpdated";

import BackButtonBlock from "./modules/backButtonBlock/BackButtonBlock";
import ProfileFormBlock from "./modules/profileFormBlock/ProfileFormBlock";
import ProfileActionButton from "./partials/profileActionButton/ProfileActionButton";
import { Avatar } from "./partials/avatar/Avatar";
import { Overlay } from "../../components/overlay/Overlay";

import {
  profilePageMainDataSettings,
  buttonSettings,
  profileActionsButtonsSettings,
  profilePagePasswordSettings,
  modalWindowAddAvatarSettings,
} from "./profilePageSettings";

import profilePageApi from "../../api/profilePageApi";
import logoutApi from "../../api/logoutApi";

import "./profilePage.scss";

export interface ProfilePageProps extends BlockProps {
  userInfo: Record<string, string>;
  isEditData: boolean;
  editMainData: boolean;
  newAvatar: File | null;
}

export default class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    console.log(props);
    super({
      ...props,
      BackButtonBlock: new BackButtonBlock({
        onClick: () => {
          if (this.props.isEditData) {
            StoreUpdated.set("ProfilePageState.isEditData", false);
            StoreUpdated.set("ProfilePageState.editMainData", true);
          } else {
            const router = Router.getInstance("app");
            router.back();
          }
        },
      }),
      Avatar: new Avatar({
        isEditData: props.isEditData,
        avatarUrl: props.userInfo.avatar,
        events: {
          click: (event: Event) => {
            event.stopPropagation();
            event.preventDefault();
            if (!this.props.isEditData) {
              const elem = this.children.OverlayWithModalWindow;
              if (elem) {
                StoreUpdated.set("ProfilePageState.OverlayWithModalWindow", elem);
                elem.getContent().classList.toggle("hidden");
              }
            }
          },
        },
      }),
      ProfileFormBlockMainData: new ProfileFormBlock(ProfilePage.getProfileFormProps(props)),
      ProfileFormBlockPassword: new ProfileFormBlock(ProfilePage.getProfileFormPropsPassword(props)),
      ProfileActionButtons: [
        ...Object.entries(profileActionsButtonsSettings).map(
          ([key, value]) =>
            new ProfileActionButton({
              options: { ...(value as Record<string, string>) },
              isLast:
                key ===
                Object.keys(profileActionsButtonsSettings)[
                  Object.keys(profileActionsButtonsSettings).length - 1
                ],
            }),
        ),
      ],
      OverlayWithModalWindow: new Overlay({
        ...modalWindowAddAvatarSettings,
        inputOptions: {
          ...modalWindowAddAvatarSettings.inputOptions,
          events: {
            change: (event: Event) => {
              event.stopPropagation();
              event.preventDefault();
              const file = (event.target as HTMLInputElement).files?.[0];
              if (file) {
                const elem =
                  this.children.OverlayWithModalWindow.children.ModalWindow.children.FileInputGroup;
                StoreUpdated.set("ProfilePageState.newAvatar", file);
                elem.setProps({
                  fileName: file.name,
                  errorText: "",
                });
              }
            },
          },
        },
        events: {
          submit: async (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            const file = this.props.newAvatar;
            if (!(file instanceof File)) {
              const elem = this.children.OverlayWithModalWindow.children.ModalWindow.children.FileInputGroup;
              elem.setProps({
                errorText: "Файл не выбран",
              });
            } else {
              const formData = new FormData();
              formData.append("avatar", file);
              const request = await profilePageApi.changeAvatar(formData);
              console.log(request);
              const elemModal = this.children.OverlayWithModalWindow.children.ModalWindow;
              if (request.status === 200) {
                elemModal.setProps({
                  title: "Аватар успешно обновлен",
                });
                this.getUserInfo();
              } else {
                elemModal.setProps({
                  title: "Ошибка, попробуйте ещё раз",
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
                title: "Загрузите файл",
                inputOptions: {
                  ...modalWindowAddAvatarSettings.inputOptions,
                  errorText: "",
                },
              });
              elemModal.children.FileInputGroup.setProps({ fileName: "" });
              StoreUpdated.set("ProfilePageState.newAvatar", null);
            }
          },
        },
      }),
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          const isValid = this.validateForm();
          if (isValid) {
            const elem = event.target as HTMLFormElement;
            if (elem && elem.tagName === "FORM") {
              const formData = new FormData(event.target as HTMLFormElement);
              const data: Record<string, string> = {};
              formData.forEach((value, key) => {
                data[key] = value.toString();
              });

              let request: XMLHttpRequest = this.props.editMainData
                ? await profilePageApi.changeUserInfo(data)
                : await profilePageApi.changeUserPassword(data);

              if (request.status !== 200) {
                const errorMessage = JSON.parse(request?.response).reason;
                alert(errorMessage);
              } else {
                alert("Данные успешно обновлены");
                StoreUpdated.set("ProfilePageState.isEditData", false);
                StoreUpdated.set("ProfilePageState.editMainData", true);
                this.getUserInfo();
              }
            }
          }
        },
      },
    });
    this.getUserInfo();
    for (const key in profileActionsButtonsSettings) {
      this.setEventsByProps(key);
    }
  }

  async getUserInfo(): Promise<void> {
    try {
      const request = await profilePageApi.request();
      if (request.status === 200) {
        const data = JSON.parse(request.response);
        data.avatar = data.avatar ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}` : null;
        StoreUpdated.set("ProfilePageState.userInfo", data);
      }
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
    }
  }

  static getProfileFormProps(props: any) {
    return {
      isEditData: props.isEditData,
      inputOptions: profilePageMainDataSettings.inputOptions.map((item) => ({
        ...item,
        value: props.userInfo?.[item.inputId] ?? "",
      })),
      buttonOptions: buttonSettings,
    };
  }

  static getProfileFormPropsPassword(props: any) {
    return {
      isEditData: props.isEditData,
      inputOptions: profilePagePasswordSettings.inputOptions,
      buttonOptions: buttonSettings,
    };
  }

  componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {
    if (oldProps.userInfo !== newProps.userInfo) {
      this.children.ProfileFormBlockMainData.setProps(ProfilePage.getProfileFormProps(newProps));
      this.children.Avatar.setProps({ avatarUrl: newProps.userInfo.avatar });
    }
    return true;
  }

  setEventsByProps(key: string): void {
    const elem = this.lists.ProfileActionButtons.find(
      (item) => (item.props.options as Record<string, string>).key === key,
    );
    if (elem) {
      switch (key) {
        case "exit":
          elem.setProps({
            events: {
              click: async (event: Event) => {
                event.preventDefault();
                event.stopPropagation();
                try {
                  const request = await logoutApi.request();
                  if (request.status === 200) {
                    store.dispatch({ type: "LOGOUT" });
                    localStorage.removeItem("auth");
                    const router = Router.getInstance("app");
                    router.go("/");
                  }
                } catch (error) {
                  console.error("Ошибка при выходе из профиля:", error);
                }
              },
            },
          });
          break;
        case "editData":
          elem.setProps({
            events: {
              click: (event: Event) => {
                event.stopPropagation();
                StoreUpdated.set("ProfilePageState.isEditData", true);
                StoreUpdated.set("ProfilePageState.editMainData", true);
              },
            },
          });
          break;
        case "editPassword":
          elem.setProps({
            events: {
              click: (event: Event) => {
                event.stopPropagation();
                StoreUpdated.set("ProfilePageState.isEditData", true);
                StoreUpdated.set("ProfilePageState.editMainData", false);
              },
            },
          });
          break;
        default:
          break;
      }
    }
  }

  private validateForm(): boolean {
    const fields = this.props.editMainData
      ? this.children.ProfileFormBlockMainData.lists.InputsGroup
      : this.children.ProfileFormBlockPassword.lists.InputsGroup;

    fields.forEach((field: Block) => {
      const inputGroup = field;
      const inputElement = inputGroup.getContent().querySelector("input") as HTMLInputElement;
      if (inputElement) {
        inputElement.dispatchEvent(new Event("blur", { bubbles: true }));
      }
    });

    return fields.every((field: Block) => {
      if (field.children.Error.props.errorText) {
        return false;
      } else {
        return true;
      }
    });
  }

  protected render(): string {
    return `
      <div id="profile-page" class="profile-page">
        <aside class="profile-page__aside">
          {{{ BackButtonBlock }}}
        </aside>
        <main class="profile-page__main-content">
          <div class="profile-page__main-content__avatar-wrapper">
            {{{ Avatar }}}
            {{#unless isEditData}}
              <h1 class="profile-page__main-content__name">{{userInfo.first_name}}</h1>
            {{/unless}}
          </div>
            {{#if editMainData}}
              {{{ ProfileFormBlockMainData }}}
            {{else}}
              {{{ ProfileFormBlockPassword }}}
            {{/if}}
          {{#unless isEditData}}
            {{{ ProfileActionButtons }}}
          {{/unless}}
          {{{ OverlayWithModalWindow }}}
        </main>
      </div>
    `;
  }
}
