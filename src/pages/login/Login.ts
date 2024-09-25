import Block from "../../globalClasses/Block";
import { FormField } from "../../components/formField/FormField";
import Button from "../../components/button/Button";

import "./login.scss";

export default class Login extends Block {
  // private children: Record<string, Block> = {};

  constructor(props?: any) {
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
          events: {
            blur: (event: Event) => {
              if (!event) return;

              const target = event.target as HTMLInputElement;
              const value = target.value;
              const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
              if (elem) {
                if (value && !/^(?=[a-zA-Z-_]*[a-zA-Z][a-zA-Z0-9-_]{2,19})$/.test(value)) {
                  elem.setProps({
                    errorText:
                      "Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
                  });
                } else {
                  elem.setProps({
                    errorText: null,
                  });
                }
              }
            },
          },
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
