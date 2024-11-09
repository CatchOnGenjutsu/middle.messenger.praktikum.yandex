import Block from "../../../../globalClasses/Block";
import { InputGroupProps } from "../../modules/inputGroup/InputGroup";

import "./displayValue.scss";

export default class DisplayValue extends Block {
  constructor(props: InputGroupProps) {
    super({
      ...props,
    });
  }

  override render(): string {
    return `
      <div class="input-field display-value">{{inputOption.value}}</div>
    `;
  }
}
