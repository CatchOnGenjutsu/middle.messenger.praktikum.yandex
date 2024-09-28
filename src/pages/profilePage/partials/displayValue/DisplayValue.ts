import Block from "../../../../globalClasses/Block";

import "./displayValue.scss";

interface DisplayValueProps {
  value: string;
  isEditData: boolean;
}
export default class DisplayValue extends Block {
  constructor(props: DisplayValueProps) {
    console.log(props);
    super({
      ...props,
    });
  }
  // {{#if isEditData}}showed{{/if}}
  protected render(): string {
    return `
      <div class="input-field display-value">{{value}}</div>
    `;
  }
}
