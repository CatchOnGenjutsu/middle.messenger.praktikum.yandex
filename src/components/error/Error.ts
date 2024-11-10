import Block from "../../globalClasses/Block";
import "./error.scss";

interface ErrorProps {
  errorText?: string;
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <p class="error">{{#if errorText}}{{errorText}}{{/if}}</p>
    `;
  }
}
