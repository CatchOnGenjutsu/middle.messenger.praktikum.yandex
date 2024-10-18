import Block from "../../globalClasses/Block";
import "./error.scss";

interface ErrorProps {
  errorText: string;
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super({
      ...props,
    });
  }

  render() {
    console.log(this.props);
    return `
    {{#if errorText}}
      <p class="error">{{errorText}}</p>
    {{else}}
      <p class="no-error"></p>
    {{/if}}
    `;
  }
}
