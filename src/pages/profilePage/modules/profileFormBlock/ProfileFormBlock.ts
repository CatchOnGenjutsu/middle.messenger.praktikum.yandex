import Block from "../../../../globalClasses/Block";
import Button from "../../../../components/button/Button";
import InputGroup from "../inputGroup/InputGroup";

import "./profileFormBlock.scss";

interface ProfileFormBlockProps {
  isEditData: boolean;
  inputOptions: Record<string, Record<string, string | boolean | null>>;
  buttonOptions: Record<string, string>;
}

export default class ProfileFormBlock extends Block {
  constructor(props: ProfileFormBlockProps) {
    console.log(props);
    super({
      ...props,
      InputsGroup: [
        ...Object.entries(props.inputOptions).map(
          ([key, value]) =>
            new InputGroup({
              inputOption: {
                ...value,
                events: ((key: string): Record<string, (event: Event) => void> => {
                  switch (key) {
                    case "email":
                      return {
                        blur: (event: Event) => {
                          if (!event) return;

                          const target = event.target as HTMLInputElement;
                          const inputValue = target.value;
                          const group = this.lists.InputsGroup.find(
                            (item) =>
                              (item.props.inputOption as Record<string, string>).inputId === target.id,
                          );
                          if (group) {
                            if (inputValue && !/^[a-zA-Z0-9._-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(inputValue)) {
                              group.children.Error.setProps({
                                errorText: "Неправильно введена почта. Почта должна содержать символы @ и .",
                              });
                            } else {
                              group.children.Error.setProps({
                                errorText: "",
                              });
                            }
                          }
                        },
                      };
                    case "login":
                      return {
                        blur: (event: Event) => {
                          if (!event) return;

                          const target = event.target as HTMLInputElement;
                          const inputValue = target.value;
                          const group = this.lists.InputsGroup.find(
                            (item) =>
                              (item.props.inputOption as Record<string, string>).inputId === target.id,
                          );
                          if (group) {
                            if (inputValue && !/^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/.test(inputValue)) {
                              group.children.Error.setProps({
                                errorText:
                                  "Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов.",
                              });
                            } else {
                              group.children.Error.setProps({
                                errorText: "",
                              });
                            }
                          }
                        },
                      };
                    case "first_name":
                    case "second_name":
                      return {
                        blur: (event: Event) => {
                          if (!event) return;

                          const target = event.target as HTMLInputElement;
                          const inputValue = target.value;
                          const group = this.lists.InputsGroup.find(
                            (item) =>
                              (item.props.inputOption as Record<string, string>).inputId === target.id,
                          );
                          if (group) {
                            if (inputValue && !/^[A-ZА-Я][a-zа-яA-ZА-Я0-9-]*$/u.test(inputValue)) {
                              group.children.Error.setProps({
                                errorText:
                                  "Допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).",
                              });
                            } else {
                              group.children.Error.setProps({
                                errorText: "",
                              });
                            }
                          }
                        },
                      };
                    case "phone":
                      return {
                        blur: (event: Event) => {
                          if (!event) return;

                          const target = event.target as HTMLInputElement;
                          const inputValue = target.value;
                          const group = this.lists.InputsGroup.find(
                            (item) =>
                              (item.props.inputOption as Record<string, string>).inputId === target.id,
                          );
                          if (group) {
                            if (inputValue && !/^\+?\d{10,15}$/u.test(inputValue)) {
                              group.children.Error.setProps({
                                errorText: "Должен содержать от 10 до 15 цифр, может начинается с плюса.",
                              });
                            } else {
                              group.children.Error.setProps({
                                errorText: "",
                              });
                            }
                          }
                        },
                      };
                    case "oldPassword":
                    case "newPassword":
                      return {
                        blur: (event: Event) => {
                          if (!event) return;

                          const target = event.target as HTMLInputElement;
                          const inputValue = target.value;
                          const group = this.lists.InputsGroup.find(
                            (item) =>
                              (item.props.inputOption as Record<string, string>).inputId === target.id,
                          );
                          if (group) {
                            if (inputValue && !/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(inputValue)) {
                              group.children.Error.setProps({
                                errorText:
                                  "Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.",
                              });
                            } else {
                              group.children.Error.setProps({
                                errorText: "",
                              });
                            }
                          }
                        },
                      };
                    case "newPasswordRepeat":
                      return {
                        blur: (event: Event) => {
                          if (!event) return;

                          const target = event.target as HTMLInputElement;
                          const inputValue = target.value;
                          const group = this.lists.InputsGroup.find(
                            (item) =>
                              (item.props.inputOption as Record<string, string>).inputId === target.id,
                          );
                          if (group) {
                            if (inputValue && !/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(inputValue)) {
                              group.children.Error.setProps({
                                errorText: "Пароли должны совпадать.",
                              });
                            } else {
                              group.children.Error.setProps({
                                errorText: "",
                              });
                            }
                          }
                        },
                      };
                    default:
                      return {};
                  }
                })(key),
              },
              isEditData: props.isEditData,
              isLast: key === Object.keys(props.inputOptions)[Object.keys(props.inputOptions).length - 1],
            }),
        ),
      ],
      Button: new Button({ ...props.buttonOptions }),
    });
  }

  render() {
    return `
      <form class="profile-form-block__form">
        {{{ InputsGroup }}}
        <div class="profile-form-block__form__buttons">
          {{#if isEditData}}{{{ Button }}}{{/if}}
        </div>
      </form>
    `;
  }
}
