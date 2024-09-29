import Block from "../../../../globalClasses/Block";

import "./burgerButton.scss";

interface BurgerButtonProps {
  popupsOpen: boolean;
  events?: {
    click: (event: Event) => void;
  };
}

export class BurgerButton extends Block {
  constructor(props: BurgerButtonProps) {
    super({
      ...props,
    });
  }
  render() {
    return `
      <div class="burger-button"></div>
    `;
  }
}
