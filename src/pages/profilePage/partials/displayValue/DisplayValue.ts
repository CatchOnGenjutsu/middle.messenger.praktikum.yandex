import Block from "../../../../globalClasses/Block";

import "./displayValue.scss";

interface DisplayValueProps {
  value: string;
  isEditData: boolean;
}
export default class DisplayValue extends Block {
  constructor(props: DisplayValueProps) {
    super({
      ...props,
    });
  }
  // {{#if isEditData}}showed{{/if}}
  override render(): string {
    return `
      <div class="input-field display-value">{{value}}</div>
    `;
  }
}
