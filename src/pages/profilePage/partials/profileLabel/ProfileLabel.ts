import Block from "../../../../globalClasses/Block";
import { InputGroupProps } from "../../modules/inputGroup/InputGroup";

import "./profileLabel.scss";

// interface ProfileLabelProps {
//   labelName: string;
//   labelFor: string;
// }

export default class ProfileLabel extends Block {
  constructor(props: InputGroupProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <label class="input-label" for="{{inputOption.labelFor}}">{{inputOption.labelName}}</label>
    `;
  }
}
