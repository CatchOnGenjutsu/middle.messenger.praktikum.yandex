import Block from "../../../../globalClasses/Block";
import { CurrentChatHeader } from "../currentChatHeader/CurrentChatHeader";
import { MessagesBlock } from "../messagesBlock/MessagesBlock";

import "./currentChat.scss";

interface IMessageProps {
  id: number;
  content: string;
  incoming: boolean;
  isImage: boolean;
  messageTime?: string;
  type: string;
  isRead?: boolean;
}

interface IMessageGroup {
  date: string;
  messages: IMessageProps[];
}

interface CurrentChatProps {
  id: number;
  avatar?: string;
  chatName: string;
  initials?: string;
  active: boolean;
  allMessages: IMessageGroup[];
  popupsOpen: boolean;
}

export default class CurrentChat extends Block {
  constructor(props: CurrentChatProps) {
    super({
      ...props,
      Header: new CurrentChatHeader({ ...props }),
      messageBlock: new MessagesBlock({ ...props, allMessages: props.allMessages }),
    });
  }

  protected render(): string {
    return ` 
    <div class="current-chat-container">
      <header>{{{ Header }}}</header>
      <main>{{{ messageBlock }}}</main>
    </div>
    `;
  }
}
