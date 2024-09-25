import Block from "../../../../globalClasses/Block";
import { BurgerButton } from "../../partials/burgerButton/BurgerButton";

import "./currentChatHeader.scss";

interface CurrentChatProps {
  id: number;
  avatar?: string;
  chatName: string;
  initials?: string;
  active: boolean;
  activeChatId?: number | null;
  popupsOpen: boolean;
  // allMessages: Record<string, MessageProps[] | string>[];
}
export class CurrentChatHeader extends Block {
  constructor(props: CurrentChatProps) {
    super({
      ...props,
      burgerButton: new BurgerButton({ popupsOpen: props.popupsOpen }),
    });
  }
  // {{> ButtonsPopup buttons=burgerButtons isActive=currentChat.popupsOpen isTopRight=true}}
  protected render(): string {
    return `
      <div class="current-chat-header">
        <div class="current-chat-header__avatar">
          {{#if avatar}}
            <img class="current-chat-header__avatar__avatar-img" src="{{avatar}}" alt="avatar">
          {{else}}
            <div class="current-chat-header__avatar__avatar-placeholder">{{initials}}</div>
          {{/if}}
        </div>
        <div class="current-chat-header__info">
          <div class="current-chat-header__info__chat-name">{{chatName}}</div>
        </div>
        <div class="current-chat-header__settings">
          {{{ burgerButton }}}
        </div>
        
      </div>
    `;
  }
}
