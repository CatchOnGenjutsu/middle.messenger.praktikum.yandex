import Block, { BlockProps } from "../../globalClasses/Block";
import { ModalWindow } from "../modalWindow/ModalWindow";

import "./overlay.scss";

export interface OverlayProps extends Partial<BlockProps> {
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
    fileName: string;
    validation?: (value: string) => string;
    events: {
      blur?: (event: Event) => void;
      change?: (event: Event) => void;
    };
  };
  buttonOptions: {
    value: string;
    type: string;
    class: string;
    id: string;
    name: string;
  };
  events: {
    submit: (event: Event) => void;
  };
  overlayEvents: {
    click: (event: Event) => void;
  };
}

export class Overlay extends Block {
  constructor(props: OverlayProps) {
    console.log(props);
    super({
      ...props,
      ModalWindow: new ModalWindow({
        ...props,
      }),
      events: { ...props.overlayEvents },
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
