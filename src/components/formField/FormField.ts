import Block from "../../globalClasses/Block";
import { Label } from "../../components/label/Label";
import { Input } from "../../components/input/Input";
import { Error } from "../../components/error/Error";

import "./formField.scss";

interface FormFieldProps {
  labelName: string;
  labelFor: string;
  inputName: string;
  inputType: string;
  inputId: string;
  inputPlaceholder: string;
  inputClassName?: string;
  events?: {
    blur: (event: Event) => void;
  };
  errorText?: string;
}

export class FormField extends Block {
  constructor(props: FormFieldProps) {
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
        errorText: props.errorText!,
      }),
    });
  }

  protected render(): string {
    return `
      <div class="form-field">
        {{{ label }}}
        {{{ input }}}
        {{{ error }}}
      </div>
    `;
  }
}
