import Block from "../../globalClasses/Block";
import "./error.scss";

interface ErrorProps {
  errorText: string | null;
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    console.log(props);
    super({
      ...props,
    });
  }

  render() {
    return `
      <p class="error">{{errorText}}</p>
    `;
  }
}
