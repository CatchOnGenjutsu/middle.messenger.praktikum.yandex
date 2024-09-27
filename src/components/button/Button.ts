import Block from "../../globalClasses/Block";
import "./button.scss";

interface ButtonProps {
  class?: string;
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  events?: Record<string, (event: Event) => void>;
}
export default class Button extends Block {
  constructor(props: ButtonProps) {
    super({ ...props });
  }

  render() {
    return `
      <button class="{{class}}" id="{{id}}" type="{{type}}">{{value}}</button>
    `;
  }
}
