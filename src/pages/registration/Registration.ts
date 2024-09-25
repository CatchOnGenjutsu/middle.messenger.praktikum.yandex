import Block from "../../globalClasses/Block";
import { FormField } from "../../components/formField/FormField";
import Button from "../../components/button/Button";

import "./registration.scss";

export default class Registration extends Block {
  constructor(props?: any) {
    super({
      ...props,
      Fields: [
        new FormField({
          labelName: "Почта",
          labelFor: "email",
          inputName: "email",
          inputType: "email",
          inputId: "email",
          inputPlaceholder: "Введите почту",
          errorText: null,
          events: {
            blur: (event: Event) => {
              if (!event) return;

              const target = event.target as HTMLInputElement;
              const value = target.value;
              const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
              if (elem) {
                if (value && !/^[a-zA-Z0-9._-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(value)) {
                  elem.setProps({
                    errorText: "Неправильно введена почта. Почта должна содержать символы @ и .",
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
                if (value && !/^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/.test(value)) {
                  elem.setProps({
                    errorText:
                      "Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).",
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
          labelName: "Имя",
          labelFor: "first_name",
          inputName: "first_name",
          inputType: "text",
          inputId: "first_name",
          inputPlaceholder: "Введите имя",
          errorText: null,
          events: {
            blur: (event: Event) => {
              if (!event) return;

              const target = event.target as HTMLInputElement;
              const value = target.value;
              const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
              if (elem) {
                if (value && !/^[A-ZА-Я][a-zа-яA-ZА-Я0-9-]*$/u.test(value)) {
                  elem.setProps({
                    errorText:
                      "Допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
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
          labelName: "Фамилия",
          labelFor: "second_name",
          inputName: "second_name",
          inputType: "text",
          inputId: "second_name",
          inputPlaceholder: "Введите фамилию",
          errorText: null,
          events: {
            blur: (event: Event) => {
              if (!event) return;

              const target = event.target as HTMLInputElement;
              const value = target.value;
              const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
              if (elem) {
                if (value && !/^[A-ZА-Я][a-zа-яA-ZА-Я0-9-]*$/u.test(value)) {
                  elem.setProps({
                    errorText:
                      "Допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
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
          labelName: "Телефон",
          labelFor: "phone",
          inputName: "phone",
          inputType: "tel",
          inputId: "phone",
          inputPlaceholder: "Введите телефон",
          errorText: null,
          events: {
            blur: (event: Event) => {
              if (!event) return;

              const target = event.target as HTMLInputElement;
              const value = target.value;
              const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
              if (elem) {
                if (value && !/^\+?\d{10,15}$/u.test(value)) {
                  elem.setProps({
                    errorText: "Должен содержать от 10 до 15 цифр, может начинается с плюса",
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
          errorText: null,
          events: {
            blur: (event: Event) => {
              if (!event) return;

              const target = event.target as HTMLInputElement;
              const value = target.value;
              const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);
              if (elem) {
                if (value && !/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value)) {
                  elem.setProps({
                    errorText:
                      "Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.",
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
          labelName: "Пароля",
          labelFor: "passwordRepeat",
          inputName: "passwordRepeat",
          inputType: "password",
          inputId: "passwordRepeat",
          inputPlaceholder: "Повторите пароль",
          errorText: null,
          events: {
            blur: (event: Event) => {
              if (!event) return;

              const target = event.target as HTMLInputElement;
              const value = target.value;
              const elem = this.lists.Fields.find((item) => item.props.inputId === target.id);

              const passwordField = this.lists.Fields.find((item) => item.props.inputId === "password");
              const passwordValue =
                passwordField?.props.inputId && passwordField?.getContent().querySelector("input")?.value;
              if (elem) {
                if (value && value !== passwordValue) {
                  elem.setProps({
                    errorText: "Пароль должны совпадать.",
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
      ],
      Button: new Button({
        class: "submit-button",
        value: "Зарегистрироваться",
        type: "submit",
        id: "submit-btn",
        name: "submit-btn",
      }),
    });
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
          <a class="registration-container__link" href="/login">Войти</a>
        </div>
      </main>
    `;
  }
}