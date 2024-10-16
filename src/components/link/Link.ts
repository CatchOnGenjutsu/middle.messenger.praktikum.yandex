import Block from "../../globalClasses/Block";

import "./link.scss";

interface LinkProps {
  href: string;
  datapage: string;
  text: string;
  class?: string;
  onClick?: (e: Event) => void;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          // this.setAttributes({
          //   class: "footer-link",
          // });
          if (props.onClick) {
            props.onClick(e);
          }
        },
      },
    });
  }

  override render(): string {
    return '<a class="{{class}}" href="{{href}}" data-page="{{datapage}}">{{text}}</a>';
  }
}
