import Block from "../../globalClasses/Block";

import "./arrowButton.scss";
interface ArrowButtonProps {
  rightBtn?: boolean;
  events?: Record<string, (event: Event) => void>;
}
export class ArrowButton extends Block {
  constructor(props: ArrowButtonProps) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return `
      {{#if rightBtn}}
        <button class="arrow-button" type="submit">
          <img class="arrow-button_right" src="/icons/arrow_icon.png" alt="arrow right">
        </button>
      {{else}}
        <button class="arrow-button" type="button">
          <img class="arrow-button_left" src="/icons/arrow_icon.png" alt="arrow left">
        </button>
      {{/if}}
    `;
  }
}
