import Block from "../../../../globalClasses/Block";
import { InputGroupProps } from "../../modules/inputGroup/InputGroup";

import "./displayValue.scss";

// interface DisplayValueProps {
//   value: string;
//   isEditData: boolean;
// }
export default class DisplayValue extends Block {
  constructor(props: InputGroupProps) {
    super({
      ...props,
    });
  }
  // {{#if isEditData}}showed{{/if}}
  override render(): string {
    return `
      <div class="input-field display-value">{{inputOption.value}}</div>
    `;
  }
}
