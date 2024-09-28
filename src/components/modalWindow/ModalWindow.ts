import Block from "../../globalClasses/Block";
import Button from "../button/Button";
import { FormField } from "../formField/FormField";

import "./modalWindow.scss";

interface ModalWindowProps {
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
}

export class ModalWindow extends Block {
  constructor(props: ModalWindowProps) {
    super({
      ...props,
      FormField: new FormField({ ...props.inputOptions }),
      Button: new Button({
        ...props.buttonOptions,
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

  protected render(): string {
    return `
      <div class="modal" id="modal">
        <div class="modal__content">
          <h2 class="modal__title">{{title}}</h2>
          <form class="modal__form">
            <div class="modal__form__input">
              {{#if inputOptions.isFile}}
                <input type="file" id="avatar" name="avatar" accept="image/*" class="file-input">
                <label for="avatar" class="file-input__label">{{inputOptions.labelName}}</label>
                {{#if inputOptions.errorMessage}}
                  <span class="file-input__error">{{inputOptions.errorMessage}}</span>
                {{/if}}
              {{else}}
                {{{ FormField }}}
              {{/if}}
            </div>
            {{{ Button }}}
          </form>
        </div>
      </div>
  `;
  }
}
