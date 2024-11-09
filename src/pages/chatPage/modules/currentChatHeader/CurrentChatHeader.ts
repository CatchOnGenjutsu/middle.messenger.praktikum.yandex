import Block from "../../../../globalClasses/Block";
import { burgerActionButtonsSettings } from "../../chatPageSettings";
import { BurgerButton } from "../../partials/burgerButton/BurgerButton";
import { ButtonsPopup } from "../buttonsPopup/ButtonsPopup";

import { CurrentChatProps } from "../currentChat/CurrentChat";

import "./currentChatHeader.scss";

export class CurrentChatHeader extends Block {
  constructor(props: CurrentChatProps) {
    console.log(props);
    super({
      ...props,
      burgerButton: new BurgerButton({
        popupsOpen: props.popupOpen || false,
        events: {
          click: (event: Event) => {
            const target = event.target as HTMLElement;
            const elem = this.children.ButtonsPopup;
            target.classList.toggle("burger-button_active");
            if (elem) {
              elem.setProps({
                popupOpen: target.classList.contains("burger-button_active"),
              });
            }
          },
        },
      }),
      ButtonsPopup: new ButtonsPopup({
        ...props,
        buttons: burgerActionButtonsSettings,
        popupOpen: props.popupOpen || false,
        isTopRight: true,
      }),
    });
  }

  protected render(): string {
    return `
      <div class="current-chat-header">
        <div class="current-chat-header__avatar">
          {{#if currentChat.avatar}}
            <img class="current-chat-header__avatar__avatar-img" src="{{currentChat.avatar}}" alt="avatar">
          {{else}}
            <div class="current-chat-header__avatar__avatar-placeholder">{{currentChat.initials}}</div>
          {{/if}}
        </div>
        <div class="current-chat-header__info">
          <div class="current-chat-header__info__chat-name">{{currentChat.title}}</div>
        </div>
        <div class="current-chat-header__settings">
          {{{ burgerButton }}}
        </div>
        {{{ ButtonsPopup }}}
      </div>
    `;
  }
}
