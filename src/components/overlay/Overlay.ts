import Block from "../../globalClasses/Block";
import { ModalWindow } from "../modalWindow/ModalWindow";

import "./overlay.scss";

interface OverlayProps {
  title: string;
  inputOptions: {
    isFile?: boolean;
    labelName: string;
    labelFor: string;
    inputName: string;
    inputType: string;
    inputId: string;
    inputPlaceholder: string;
    errorText: string;
  };
  buttonOptions: {
    value: string;
    type: string;
    class: string;
    id: string;
    name: string;
  };
}

export class Overlay extends Block {
  constructor(props: OverlayProps) {
    super({
      ...props,
      ModalWindow: new ModalWindow({
        ...props,
      }),
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;
          if (target?.id === "modalOverlay") {
            this.getContent().classList.toggle("hidden");
          }
        },
      },
    });
  }

  render(): string {
    return `
    <div class="modal-overlay hidden" id="modalOverlay">
      {{{ ModalWindow }}}
    </div>
    `;
  }
}
