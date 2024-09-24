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
        labelFor: props.labelFor,
      }),
      input: new Input({
        inputName: props.inputName,
        inputType: props.inputType,
        inputId: props.inputId,
        inputPlaceholder: props.inputPlaceholder,
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
