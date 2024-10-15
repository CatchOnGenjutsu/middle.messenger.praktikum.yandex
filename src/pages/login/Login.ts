import Block, { BlockProps } from "../../globalClasses/Block";
import { FormField } from "../../components/formField/FormField";
import Button from "../../components/button/Button";

import "./login.scss";

interface LoginProps extends BlockProps {
  // Здесь вы можете добавить дополнительные свойства, если это необходимо
}

export default class Login extends Block {
  // private children: Record<string, Block> = {};

  constructor(props?: LoginProps) {
    super({
      ...props,
      Fields: [
        new FormField({
          labelName: "Логин",
          labelFor: "login",
          inputName: "login",
          inputType: "text",
          inputId: "login",
          inputPlaceholder: "Введите логин",
          errorText: null,
        }),
        new FormField({
          labelName: "Пароль",
          labelFor: "password",
          inputName: "password",
          inputType: "password",
          inputId: "password",
          inputPlaceholder: "Введите пароль",
          errorText: "",
        }),
      ],
      Button: new Button({
        value: "Войти",
        type: "submit",
        class: "submit-button",
        id: "submit-btn",
        name: "submit-btn",
      }),
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          const elem = event.target as HTMLFormElement;
          if (elem && elem.tagName === "FORM") {
            const formData = new FormData(event.target as HTMLFormElement);
            const data: Record<string, string> = {};
            formData.forEach((value, key) => {
              data[key] = value.toString();
            });
            console.log(data);
          }
        },
      },
    });
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
        <a class="login-container__link" href="/registration">Нет аккаунта?</a>
        </div>
      </main>
    `;
  }
}
