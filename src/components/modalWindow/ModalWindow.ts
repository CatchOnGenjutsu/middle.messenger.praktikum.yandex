import Block from "../../globalClasses/Block";
import Button from "../button/Button";
import FormField from "../formField/FormField";
import FileInputGroup from "../fileInputGroup/FileInputGroup";

import "./modalWindow.scss";

export interface ModalWindowProps {
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
    fileName: string;
    validation?: (value: string) => string | null;
    events: {
      // focus?: (event: Event) => void;
      blur?: (event: Event) => void;
      change?: (event: Event) => void;
    };
  };
  buttonOptions: {
    value: string;
    type: string;
    class: string;
    id: string;
    name: string;
  };
  events: {
    submit: (event: Event) => void;
  };
}

export class ModalWindow extends Block {
  constructor(props: ModalWindowProps) {
    super({
      ...props,
      FileInputGroup: new FileInputGroup({
        ...props.inputOptions,
      }),
      FormField: new FormField({ ...props.inputOptions }),
      Button: new Button({
        ...props.buttonOptions,
      }),
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
                {{{FileInputGroup}}}
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
