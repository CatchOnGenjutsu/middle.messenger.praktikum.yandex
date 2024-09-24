import Block from "../../globalClasses/Block";
import { Label } from "../../components/label/Label";
import { Input } from "../../components/input/Input";
import { Error } from "../../components/error/Error";

import "./formField.scss";

export class FormField extends Block {
  constructor(props?: FormFieldProps) {
    super({
      ...props,
      label: new Label({
        labelName: props.labelName,
        for: props.for,
      }),
      input: new Input({
        inputName: props.inputName,
        type: props.inputType,
        id: props.inputId,
        placeholder: props.inputPlaceholder,
        events: props.events,
      }),
      error: new Error({
        errorText: props.errorText,
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
