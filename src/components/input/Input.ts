import Block from "../../globalClasses/Block";
import "./input.scss";

interface InputProps {
  name: string;
  type: string;
  id: string;
  placeholder: string;
  events?: {
    focus: (event: Event) => void;
    blur: (event: Event) => void;
    input: (event: Event) => void;
  };
}
export class Input extends Block {
  constructor(props: InputProps) {
    super({ ...props });
  }
  override render() {
    return `
      <input
        type="{{type}}"
        id="{{id}}"
        name="{{name}}"
        placeholder="{{placeholder}}"
      />
    `;
  }
}
