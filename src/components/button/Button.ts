import Block from "../../globalClasses/Block";
import "./button.scss";

export interface ButtonProps {
  class?: string;
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  modifierClass?: string;
  events?: Record<string, (event: Event) => void>;
}
export default class Button extends Block {
  constructor(props: ButtonProps) {
    super({ ...props });
  }

  render() {
    return `
      <button class="{{class}} {{modifierClass}}" id="{{id}}" type="{{type}}">{{value}}</button>
    `;
  }
}
