import Block from "../../../../globalClasses/Block";

import { ArrowButton } from "../../../../components/arrowButton/ArrowButton";

import "./backButtonBlock.scss";

interface BackButtonBlockProps {
  onClick: () => void;
}

export default class BackButtonBlock extends Block {
  constructor(props: BackButtonBlockProps) {
    super({
      ArrowButton: new ArrowButton({
        rightBtn: false,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            event.stopPropagation();
            props.onClick();
          },
        },
      }),
      events: {
        click: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          props.onClick();
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
