import Block from "../../../../globalClasses/Block";

import "./burgerButton.scss";

interface BurgerButtonProps {
  popupsOpen: boolean;
}

export class BurgerButton extends Block {
  constructor(props: BurgerButtonProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;
          target.classList.toggle("burger-button_active");
        },
      },
    });
  }
  render() {
    return `
      <div class="burger-button {{#if isActive}}burger-button_active{{/if}}"></div>
    `;
  }
}
