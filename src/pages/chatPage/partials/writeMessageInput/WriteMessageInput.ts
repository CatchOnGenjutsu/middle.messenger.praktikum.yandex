import Block from "../../../../globalClasses/Block";

import "./writeMessageInput.scss";

export class WriteMessageInput extends Block {
  constructor() {
    super();
  }

  protected render(): string {
    return `
      <input id="message" name="message" type="text" class="write-message-input" placeholder="Сообщение"/>
    `;
  }
}
