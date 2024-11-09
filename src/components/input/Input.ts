import Block from "../../globalClasses/Block";
import "./input.scss";

interface InputProps {
  inputName: string;
  inputType: string;
  inputId: string;
  inputPlaceholder: string;
  inputClassName?: string;
  events: {
    blur?: (event: Event) => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({ ...props });
  }

  override render() {
    return `
      <input
        class="input{{#if inputClassName}} {{inputClassName}} {{/if}}"
        type="{{inputType}}"
        id="{{inputId}}"
        name="{{inputName}}"
        placeholder="{{inputPlaceholder}}"
      />
    `;
  }
}
