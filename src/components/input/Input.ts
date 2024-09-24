import Block from "../../globalClasses/Block";
import "./input.scss";

interface InputProps {
  inputName: string;
  type: string;
  id: string;
  placeholder: string;
  className?: string;
  events?: {
    // focus: (event: Event) => void;
    blur: (event: Event) => void;
    // input: (event: Event) => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({ ...props });
  }

  override render() {
    return `
      <input
        class="input{{#if className}} {{className}} {{/if}}"
        type="{{type}}"
        id="{{id}}"
        name="{{inputName}}"
        placeholder="{{placeholder}}"
      />
    `;
  }
}
