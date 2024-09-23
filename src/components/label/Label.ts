import Block from "../../globalClasses/Block";
import "./label.scss";

interface LabelProps {
  labelName: string;
  for: string;
}

export class Label extends Block {
  constructor(props: LabelProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `
      <label class="label" for="{{for}}">{{labelName}}</label>
    `;
  }
}
