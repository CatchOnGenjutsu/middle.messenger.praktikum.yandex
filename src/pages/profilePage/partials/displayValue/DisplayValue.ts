import Block from "../../../../globalClasses/Block";

import "./displayValue.scss";

interface DisplayValueProps {
  value: string;
}
export default class DisplayValue extends Block {
  constructor(props: DisplayValueProps) {
    super({
      ...props,
    });
  }
  protected render(): string {
    return `
      <div class="input-field display-value">{{value}}</div>
    `;
  }
}
