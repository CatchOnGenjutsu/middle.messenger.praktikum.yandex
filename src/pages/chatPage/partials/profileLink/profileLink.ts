import Block from "../../../../globalClasses/Block";

export interface ProfileLinkProps {
  linkText: string;
  linkClass: string;
  iconClass: string;
  iconUrl: string;
  onClick?: (e: Event) => void;
  href?: string;
}

export class ProfileLink extends Block {
  constructor(props: ProfileLinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          if (props.onClick) {
            props.onClick(e);
          }
        },
      },
    });
  }

  render() {
    return `        
      <a class="{{linkClass}}">
        {{linkText}} <img class="{{iconClass}}" src="{{iconUrl}}" alt="profile icon"/>
      </a>
    `;
  }
}
