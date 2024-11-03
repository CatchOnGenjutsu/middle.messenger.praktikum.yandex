import Block from "../../../../globalClasses/Block";
import { AddAppsButton } from "../../partials/addAppsButton/AddAppsButton";
import { WriteMessageInput } from "../../partials/writeMessageInput/WriteMessageInput";
import { ArrowButton } from "../../../../components/arrowButton/ArrowButton";
import { ButtonsPopup } from "../buttonsPopup/ButtonsPopup";

import { addAppsActionButtonsSettings } from "../../mockData";

import "./currentChatFooter.scss";

interface CurrentChatFooterProps {
  popupOpen: boolean;
  webSocketInstance?: WebSocket | null;
}

export class CurrentChatFooter extends Block {
  constructor(props: CurrentChatFooterProps) {
    super({
      ...props,
      AddAppsButton: new AddAppsButton({
        popupOpen: props.popupOpen,
        events: {
          click: (event: Event) => {
            const target = event.target as HTMLElement;
            const elem = this.children.ButtonsPopup;
            target.classList.toggle("add-apps-button_active");
            if (elem) {
              elem.setProps({
                popupOpen: target.classList.contains("add-apps-button_active"),
              });
            }
          },
        },
      }),
      WriteMessageInput: new WriteMessageInput(),
      ArrowButton: new ArrowButton({
        rightBtn: true,
      }),
      ButtonsPopup: new ButtonsPopup({
        ...props,
        buttons: addAppsActionButtonsSettings,
        popupOpen: props.popupOpen,
        isBottomLeft: true,
      }),
    });
  }

  render() {
    return `
      <form class="current-chat-footer">
        {{{ AddAppsButton }}}
        {{{ WriteMessageInput }}}
        {{{ ArrowButton }}}
        {{{ ButtonsPopup }}}
      </form>
    `;
  }
}
