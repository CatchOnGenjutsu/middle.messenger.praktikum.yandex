import Block from "../../globalClasses/Block";
import { Label } from "../../components/label/Label";
import { Input } from "../../components/input/Input";
import { Error } from "../../components/error/Error";

import "./formField.scss";

export class FormField extends Block {
  constructor(props?: any) {
    super({
      ...props,
      label: new Label({
        labelName: "Логин",
        for: "login",
      }),
      input: new Input({
        name: "login",
        type: "text",
        id: "login",
        placeholder: "Введите логин",
      }),
      error: new Error({
        errorText: "Неверный логин",
      }),
    });
  }

  override render(): string {
    return `
      <div class="form-field">
        {{{ label }}}
        {{{ input }}}
        {{{ error }}}
      </div>
    `;
  }
}
