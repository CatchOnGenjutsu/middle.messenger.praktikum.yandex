import Block from "../../globalClasses/Block";
import Router from "../../globalClasses/Router";

import FormField from "../../components/formField/FormField";
import Link from "../../components/link/Link";
import Button from "../../components/button/Button";

import { formFieldsConfig, buttonSettings, linkSettings, FormFieldConfig } from "./registrationPageSettings";

import registrationApi from "../../api/registrationApi";

import "./registration.scss";

export default class Registration extends Block {
  constructor() {
    super({
      Fields: formFieldsConfig.map(
        (config: FormFieldConfig) =>
          new FormField({
            ...config,
            errorText: null,
            events: {
              blur: (event: Event) => {
                if (!event) return;

                const target = event.target as HTMLInputElement;
                const value = target.value;
                const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);

                if (elem) {
                  const errorMessage = config.validation(value, this.lists.Fields as FormField[]);
                  elem.children.error.setProps({ errorText: errorMessage });
                }
              },
            },
          }),
      ),
      Button: new Button({
        ...buttonSettings,
      }),
      Link: new Link({
        ...linkSettings,
      }),
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          const isValid = this.validateForm();
          if (isValid) {
            const elem = event.target as HTMLFormElement;
            if (elem && elem.tagName === "FORM") {
              const formData = new FormData(elem);
              const data: Record<string, string> = {};
              formData.forEach((value, key) => {
                data[key] = value.toString();
              });
              const response = await registrationApi.create(data);
              if (response?.status === 200) {
                localStorage.setItem("auth", "true");
                const router = Router.getInstance("app");
                router.go("/messenger");
              } else {
                const errorMessage = JSON.parse(response?.response).reason;
                alert(errorMessage);
              }
            }
          }
        },
      },
    });
  }

  private validateField(inputId: string, value: string): boolean {
    const field = this.lists.Fields.find((item) => item.props.inputId === inputId)?.children.error;
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
            errorText: isValid ? null : "Должен содержать от 10 до 15 цифр, может начинаться с плюса.",
          });
          break;
        case "password":
          isValid = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value);
          field.setProps({
            errorText: isValid
              ? null
              : "Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.",
          });
          break;
        case "passwordRepeat": {
          const passwordField = this.lists.Fields.find((item) => item.props.inputId === "password");
          const passwordValue = passwordField?.getContent().querySelector("input")?.value || "";
          isValid = value === passwordValue;
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

    this.lists.Fields.forEach((field: Block) => {
      const formField = field as FormField;
      const inputElement = formField.getContent().querySelector("input") as HTMLInputElement;
      const value = inputElement?.value || "";
      const inputId = inputElement?.id || "";
      const isValid = this.validateField(inputId, value);
      if (!isValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  protected render(): string {
    return `
      <main class="registration-container">
        <div class="registration-container__registration-block">
          <h1>Регистрация</h1>
          <form class="registration-container__form" action="submit">
              {{{Fields}}}
              {{{Button}}}
          </form>
          {{{Link}}}
        </div>
      </main>
    `;
  }
}
