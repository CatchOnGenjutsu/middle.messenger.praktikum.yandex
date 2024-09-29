import Block from "../../../../globalClasses/Block";
import { ActionButton } from "../../partials/actionButton/ActionButton";
import { Overlay } from "../../../../components/overlay/Overlay";

import { modalWindowSettings } from "../../mockData";

import "./buttonsPopup.scss";

interface ActionButtonProps {
  icon: string;
  alt: string;
  label: string;
}

interface ButtonsPopupProps {
  buttons: ActionButtonProps[];
  popupOpen: boolean;
  isBottomLeft?: boolean;
  isTopRight?: boolean;
}

export class ButtonsPopup extends Block {
  constructor(props: ButtonsPopupProps) {
    super({
      ...props,
      Buttons: [
        ...props.buttons.map(
          (button) =>
            new ActionButton({
              ...button,
              events: {
                click: (event: Event) => {
                  event.stopPropagation();
                  const elem = this.children.OverlayWithModalWindow;
                  console.log(elem);
                  if (elem) {
                    elem.getContent().classList.toggle("hidden");
                  }
                },
              },
            }),
        ),
      ],
      OverlayWithModalWindow: new Overlay({ ...modalWindowSettings }),
    });
  }

  protected render(): string {
    return `
      <div class="buttons-popup {{#if popupOpen}}buttons-popup_active{{/if}} {{#if isTopRight}}buttons-popup_top-right{{/if}} {{#if isBottomLeft}}buttons-popup_bottom-left{{/if}}">
        {{{ Buttons }}}
        {{{ OverlayWithModalWindow }}}
      </div>
    `;
  }
}
