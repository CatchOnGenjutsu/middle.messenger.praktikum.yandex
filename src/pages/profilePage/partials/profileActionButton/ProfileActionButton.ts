import Block from "../../../../globalClasses/Block";

import "./profileActionButton.scss";

interface ProfileActionButtonProps {
  options: Record<string, string>;
  isLast: boolean;
  events?: Record<string, (event: Event) => void>;
}

export default class ProfileActionButton extends Block {
  constructor(props: ProfileActionButtonProps) {
    super({ ...props });
  }

  render(): string {
    return `
      <div>
        <button class="button {{options.modifierClass}}" type="button">
          {{options.text}}
        </button>
        <hr class="divider-line {{#if isLast}}divider-line_last{{/if}}">
      </div>
    `;
  }
}
