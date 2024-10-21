import Block from "../../../../globalClasses/Block";
import Router from "../../../../globalClasses/Router";

import { ArrowButton } from "../../../../components/arrowButton/ArrowButton";

import "./backButtonBlock.scss";

export default class BackButtonBlock extends Block {
  constructor() {
    super({
      ArrowButton: new ArrowButton({
        rightBtn: false,
        events: {
          click: (event: Event) => {
            const router = Router.getInstance("app");
            router.back();
            event.preventDefault();
            event.stopPropagation();
          },
        },
      }),
      events: {
        click: (event: Event) => {
          const router = Router.getInstance("app");
          router.back();
          event.preventDefault();
          event.stopPropagation();
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
