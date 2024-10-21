import Block from "../../globalClasses/Block";
import Router from "../../globalClasses/Router";

import FormField from "../../components/formField/FormField";
import Link from "../../components/link/Link";
import Button from "../../components/button/Button";

import { formFieldsConfig, buttonSettings, linkSettings, FormFieldConfig } from "./loginFormSettings";

import loginApi from "../../api/loginApi";

import "./login.scss";

export default class Login extends Block {
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
              console.log(data);
              const response = await loginApi.create(data);
              const router = Router.getInstance("app");
              if (response?.status === 200) {
                localStorage.setItem("auth", "true");
                router.go("/messenger");
              } else {
                if (response?.status === 400) {
                  const errorMessage = JSON.parse(response?.response).reason;
                  if (errorMessage === "User already in system") {
                    router.go("/messenger");
                  }
                  return;
                }
                const errorMessage = JSON.parse(response?.response).reason;
                alert(errorMessage);
              }
            }
          }
        },
      },
      // events: {
      //   submit: (event: Event) => {
      //     event.preventDefault();
      //     const elem = event.target as HTMLFormElement;
      //     if (elem && elem.tagName === "FORM") {
      //       const formData = new FormData(event.target as HTMLFormElement);
      //       const data: Record<string, string> = {};
      //       formData.forEach((value, key) => {
      //         data[key] = value.toString();
      //       });
      //       console.log(data);
      //     }
      //   },
      // },
    });
  }
  private validateField(inputId: string, value: string): boolean {
    const field = this.lists.Fields.find((item) => item.props.inputId === inputId)?.children.error;

    if (field) {
      switch (inputId) {
        case "login":
          field.setProps({
            errorText: value ? null : "Введите логин",
          });
          break;
        case "password":
          value;
          field.setProps({
            errorText: value ? null : "Введите пароль",
          });
          break;
      }
    }

    return !!value;
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

  render(): string {
    return `
      <main class="login-container">
        <div class="login-container__login-block">
        <h1>Вход</h1>
        <form class="login-container__form" action="submit">
          {{{Fields}}}
          {{{Button}}}
        </form>
        {{{Link}}}
        </div>
      </main>
    `;
  }
}
