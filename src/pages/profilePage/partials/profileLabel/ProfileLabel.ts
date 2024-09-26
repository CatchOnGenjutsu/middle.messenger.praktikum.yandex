import Block from "../../../../globalClasses/Block";

import "./profileLabel.scss";

interface ProfileLabelProps {
  labelName: string;
  labelFor: string;
}

export default class ProfileLabel extends Block {
  constructor(props: ProfileLabelProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <label class="input-label" for="{{labelFor}}">{{labelName}}</label>
    `;
  }
}
