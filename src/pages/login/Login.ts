import Block from "../../globalClasses/Block";
import { FormField } from "../../components/formField/FormField";
import "./login.scss";

export default class Login extends Block {
  constructor(props?: any) {
    super({
      ...props,
      Field: new FormField(),
    });
  }

  render(): string {
    return `
      <div class="login">
        {{{ Field }}}
      </div>
    `;
  }
}
