import Block from "../../../../globalClasses/Block";
import { InputGroupProps } from "../../modules/inputGroup/InputGroup";

import "./profileInput.scss";

export default class ProfileInput extends Block {
  constructor(props: InputGroupProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return `
      <input class="input-field" type="{{inputOption.inputType}}" name="{{inputOption.inputName}}" id="{{inputOption.inputId}}" value="{{inputOption.value}}" placeholder="{{inputOption.inputPlaceholder}}">
    `;
  }
}
