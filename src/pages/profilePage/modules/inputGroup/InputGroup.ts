import Block from "../../../../globalClasses/Block";
import DisplayValue from "../../partials/displayValue/DisplayValue";
import ProfileInput from "../../partials/profileInput/ProfileInput";
import ProfileLabel from "../../partials/profileLabel/ProfileLabel";

import "./inputGroup.scss";

interface InputGroupProps {
  isEditData: boolean;
  inputOption: Record<string, string | boolean | null>;
  isLast: boolean;
}

export default class InputGroup extends Block {
  constructor(props: InputGroupProps) {
    console.log(props);
    super({
      ...props,
      ProfileLabel: new ProfileLabel({
        labelName: props.inputOption.labelName as string,
        labelFor: props.inputOption.labelFor as string,
      }),
      ProfileInput: new ProfileInput({
        inputId: props.inputOption.inputName as string,
        inputName: props.inputOption.inputName as string,
        inputType: props.inputOption.inputType as string,
        inputPlaceholder: props.inputOption.inputPlaceholder as string,
        value: props.inputOption.value as string,
      }),
      DisplayValue: new DisplayValue({ value: props.inputOption.value as string }),
    });
  }

  render(): string {
    return `
    <div class="input-group">
      <div class="input-group__input-row">
        {{{ ProfileLabel }}}
        {{#if isEditData}}
          {{{ ProfileInput }}}
        {{else}}
          {{{ DisplayValue }}}
        {{/if}}
      </div>
      <hr class="input-group__input-row__hr {{#if isLast}}input-group__input-row__hr_last{{/if}}">
    </div>
    `;
  }
}
