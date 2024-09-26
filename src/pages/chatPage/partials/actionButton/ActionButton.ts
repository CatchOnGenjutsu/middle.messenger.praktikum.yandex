import Block from "../../../../globalClasses/Block";

import "./actionButton.scss";

interface ActionButtonProps {
  icon: string;
  alt: string;
  label: string;
  events?: Record<string, (event: Event) => void>;
}

export class ActionButton extends Block {
  constructor(props: ActionButtonProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <button class="action-button" type="button">
        <img class="action-button__icon" src="{{icon}}" alt="{{alt}}">{{label}}
      </button>
      `;
  }
}
