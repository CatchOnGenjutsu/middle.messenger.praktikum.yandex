import Block from "../../globalClasses/Block";
import "./label.scss";

interface LabelProps {
  labelName: string;
  labelFor: string;
}

export class Label extends Block {
  constructor(props: LabelProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `
      <label class="label" for="{{labelFor}}">{{labelName}}</label>
    `;
  }
}
