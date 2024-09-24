import Block from "../../globalClasses/Block";
import { FormField } from "../../components/formField/FormField";

// import { FormFieldSettings, FormFieldProps } from "./loginFormSettings";
import "./login.scss";

export default class Login extends Block {
  // private children: Record<string, Block> = {};

  constructor(props?: any) {
    super({
      ...props,
      Fields: [
        new FormField({
          labelName: "Логин",
          for: "login",
          inputName: "login",
          inputType: "text",
          inputId: "login",
          inputPlaceholder: "Введите логин",
          errorText: "",
          events: {
            blur: (event: Event) => {
              if (!event) return;

              const target = event.target as HTMLInputElement;
              const value = target.value;
              console.log(target.id);
              const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
              if (elem) {
                if (!/^(?=[a-zA-Z-_]*[a-zA-Z][a-zA-Z0-9-_]{2,19})$/.test(value)) {
                  elem.setProps({
                    errorText:
                      "Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)", // Устанавливаем текст ошибки
                  });
                } else {
                  elem.setProps({
                    errorText: "", // Очищаем ошибку
                  });
                }
              }
            },
          },
        }),
        new FormField({
          labelName: "Пароль",
          for: "password",
          inputName: "password",
          inputType: "password",
          inputId: "password",
          inputPlaceholder: "Введите пароль",
        }),
      ],
    });
  }

  render(): string {
    return `
      <div class="login-container">
        <div class="login-container__login-block">
        <h1>Вход</h1>
        <form class="login-container__form" action="submit">
          {{{Fields}}}
        </form>
        </div>
      </div>
    `;
  }
}
