import Block from "../../../../globalClasses/Block";

import "./addAppsButton.scss";

interface AddAppsButtonProps {
  popupOpen?: boolean;
  events?: {
    click: (event: Event) => void;
  };
}

export class AddAppsButton extends Block {
  constructor(props: AddAppsButtonProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <div class="add-apps-button"></div>
    `;
  }
}
