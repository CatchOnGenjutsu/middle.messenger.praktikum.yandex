import Block from "../../../../globalClasses/Block";

import "./profileInput.scss";

interface ProfileInputProps {
  inputType: string;
  inputName: string;
  inputId: string;
  value: string;
  inputPlaceholder: string;
}
export default class ProfileInput extends Block {
  constructor(props: ProfileInputProps) {
    super({ ...props });
  }

  render(): string {
    return `
      <input class="input-field" type="{{inputType}}" name="{{inputName}}" id="{{inputId}}" value="{{value}}" placeholder="{{inputPlaceholder}}">
    `;
  }
}
