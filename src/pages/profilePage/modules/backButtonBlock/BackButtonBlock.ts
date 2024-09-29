import Block from "../../../../globalClasses/Block";
import { ArrowButton } from "../../../../components/arrowButton/ArrowButton";

import "./backButtonBlock.scss";

export default class BackButtonBlock extends Block {
  constructor() {
    super({
      ArrowButton: new ArrowButton({
        rightBtn: false,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            window.history.back();
          },
        },
      }),
      events: {
        click: (event: Event) => {
          event.preventDefault();
          window.history.back();
        },
      },
    });
  }

  protected render(): string {
    return `
      <div class="back-button-block">
        {{{ ArrowButton }}}
      </div>
    `;
  }
}
