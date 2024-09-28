import Block from "../../globalClasses/Block";
import BackButtonBlock from "./modules/backButtonBlock/BackButtonBlock";
import ProfileFormBlock from "./modules/profileFormBlock/ProfileFormBlock";
import ProfileActionButton from "./partials/profileActionButton/ProfileActionButton";
import { Avatar } from "./partials/avatar/Avatar";
import { Overlay } from "../../components/overlay/Overlay";

import { profilePageViewModeMainDataSettings, profilePageEditPasswordDataSettings } from "./mockData";

import "./profilePage.scss";

interface ProfilePageProps {
  isEditData: boolean;
  editMainData?: boolean;
  avatarUrl: string;
  buttonOptions: Record<string, string>;
  actionsButtons: Record<string, Record<string, string>>;
  inputOptions: Record<string, Record<string, string | boolean | null>>;
  modalWindowSettings: {
    title: string;
    inputOptions: {
      isFile?: boolean;
      labelName: string;
      labelFor: string;
      inputName: string;
      inputType: string;
      inputId: string;
      inputPlaceholder: string;
      errorText: string;
    };
    buttonOptions: {
      value: string;
      type: string;
      class: string;
      id: string;
      name: string;
    };
  };
}
export default class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    console.log(props);
    super({
      ...props,
      isEditData: props.isEditData,
      editMainData: true,
      BackButtonBlock: new BackButtonBlock(),
      Avatar: new Avatar({
        isEditData: props.isEditData,
        avatarUrl: props.avatarUrl,
        events: {
          click: (event: Event) => {
            event.stopPropagation();
            const elem = this.children.OverlayWithModalWindow;
            if (elem) {
              elem.getContent().classList.toggle("hidden");
            }
          },
        },
      }),
      ProfileFormBlockMainData: new ProfileFormBlock({
        isEditData: props.isEditData,
        inputOptions: {
          ...profilePageViewModeMainDataSettings.inputOptions,
        },
        buttonOptions: props.buttonOptions,
      }),
      ProfileFormBlockPassword: new ProfileFormBlock({
        isEditData: props.isEditData,
        inputOptions: {
          ...profilePageEditPasswordDataSettings.inputOptions,
        },
        buttonOptions: props.buttonOptions,
      }),
      ProfileActionButtons: [
        ...Object.entries(props.actionsButtons).map(
          ([key, value]) =>
            new ProfileActionButton({
              options: { ...(value as Record<string, string>) },
              isLast: key === Object.keys(props.actionsButtons)[Object.keys(props.actionsButtons).length - 1],
            }),
        ),
      ],
      OverlayWithModalWindow: new Overlay({
        ...props.modalWindowSettings,
      }),
      events: {
        submit: (event: Event) => {
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
              console.log(data);
            }
          }
        },
      },
    });
    for (const key in props.actionsButtons) {
      this.setEventsByProps(key);
    }
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
              click: (event: Event) => {
                event.stopPropagation();
                window.location.href = "/login";
              },
            },
          });
          break;
        case "editData":
          elem.setProps({
            events: {
              click: (event: Event) => {
                event.stopPropagation();
                this.setProps({
                  isEditData: true,
                  editMainData: true,
                  // inputOptions: { ...profilePageViewModeMainDataSettings.inputOptions },
                });
                this.children.ProfileFormBlockMainData.setProps({
                  ...this.children.ProfileFormBlockMainData.props,
                  isEditData: true,
                });
                this.children.ProfileFormBlockMainData.lists.InputsGroup.forEach((input) => {
                  input.setProps({
                    isEditData: true,
                  });
                });
              },
            },
          });
          break;
        case "editPassword":
          elem.setProps({
            events: {
              click: (event: Event) => {
                event.stopPropagation();
                this.setProps({
                  isEditData: true,
                  editMainData: false,
                  // inputOptions: { ...profilePageEditPasswordDataSettings.inputOptions },
                });
                this.children.ProfileFormBlockPassword.setProps({
                  ...this.children.ProfileFormBlockPassword.props,
                  isEditData: true,
                });
                this.children.ProfileFormBlockPassword.lists.InputsGroup.forEach((input) => {
                  input.setProps({
                    isEditData: true,
                  });
                });
              },
            },
          });
          break;
        default:
          break;
      }
    }
  }

  private validateField(inputId: string, value: string, field: Block): boolean {
    let isValid = true;

    if (field) {
      switch (inputId) {
        case "email":
          isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(value);
          field.setProps({
            errorText: isValid ? null : "Неправильно введена почта. Почта должна содержать символы @ и .",
          });
          break;
        case "login":
          isValid = /^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/.test(value);
          field.setProps({
            errorText: isValid
              ? null
              : "Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов.",
          });
          break;
        case "first_name":
        case "second_name":
          isValid = /^[A-ZА-Я][a-zа-яA-ZА-Я0-9-]*$/u.test(value);
          field.setProps({
            errorText: isValid
              ? null
              : "Допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).",
          });
          break;
        case "phone":
          isValid = /^\+?\d{10,15}$/u.test(value);
          field.setProps({
            errorText: isValid ? null : "Должен содержать от 10 до 15 цифр, может начинается с плюса.",
          });
          break;
        case "oldPassword":
        case "newPassword":
          isValid = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value);
          field.setProps({
            errorText: isValid
              ? null
              : "Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.",
          });
          break;
        case "newPasswordRepeat": {
          const newPasswordField = this.children.ProfileFormBlockPassword.lists.InputsGroup.find(
            (item) => item.props.inputId === "newPassword",
          );
          const newPasswordValue = newPasswordField?.getContent().querySelector("input")?.value || "";
          isValid = value === newPasswordValue;
          field.setProps({
            errorText: isValid ? null : "Пароли должны совпадать.",
          });
          break;
        }
      }
    }

    return isValid;
  }

  private validateForm(): boolean {
    let isFormValid = true;
    const fields = this.props.editMainData
      ? this.children.ProfileFormBlockMainData.lists.InputsGroup
      : this.children.ProfileFormBlockPassword.lists.InputsGroup;

    fields.forEach((field: Block) => {
      const inputGroup = field;
      const inputElement = inputGroup.getContent().querySelector("input") as HTMLInputElement;
      const value = inputElement?.value || "";
      const inputId = inputElement?.id || "";
      const isValid = this.validateField(inputId, value, field);
      if (!isValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
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
              <h1 class="profile-page__main-content__name">{{inputOptions.first_name.value}}</h1>
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
