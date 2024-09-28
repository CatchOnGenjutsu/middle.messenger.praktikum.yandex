import Block from "../../../../globalClasses/Block";

import "./profileInput.scss";

interface ProfileInputProps {
  inputType: string;
  inputName: string;
  inputId: string;
  value: string;
  inputPlaceholder: string;
  events: Record<string, (event: Event) => void>;
  isEditData: boolean;
}
export default class ProfileInput extends Block {
  constructor(props: ProfileInputProps) {
    console.log(props);
    super({
      ...props,
    });
  }
  // {{#if isEditData}}showed{{/if}}
  render(): string {
    return `
      <input class="input-field " type="{{inputType}}" name="{{inputName}}" id="{{inputId}}" value="{{value}}" placeholder="{{inputPlaceholder}}">
    `;
  }
}
