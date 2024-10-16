import Block from "../../globalClasses/Block";
import Router from "../../globalClasses/Router";

import { FormField } from "../../components/formField/FormField";
import { Link } from "../../components/link/Link";
import Button from "../../components/button/Button";

import "./login.scss";

// interface LoginProps extends BlockProps {
//   // Здесь вы можете добавить дополнительные свойства, если это необходимо
// }

export default class Login extends Block {
  // private children: Record<string, Block> = {};

  constructor() {
    super({
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
      Link: new Link({
        href: "/sign-up",
        text: "Нет аккаунта?",
        datapage: "sign-up",
        class: "login-container__link",
        onClick: (event: Event) => {
          const router = new Router("app");
          router.go("/sign-up");
          console.log("CLICK /sign-up");
          event.preventDefault();
          event.stopPropagation();
          // event.preventDefault();
          // event.stopPropagation();
          // console.log("click");
        },
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
  // <a
  //         class="login-container__link"
  //         href="/sign-up"
  //         onclick="() => {
  //           console.log('click');
  //           event.preventDefault()
  //         }">
  //         Нет аккаунта?
  //         </a>

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
