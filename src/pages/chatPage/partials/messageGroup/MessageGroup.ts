import Block from "../../../../globalClasses/Block";
import { MessageItem } from "../messageItem/MessageItem";

import "./messageGroup.scss";

interface IMessageGroupProps {
  date: string;
  messages: {
    id: number;
    content: string;
    incoming: boolean;
    isImage: boolean;
    messageTime?: string;
    type: string;
    isRead?: boolean;
  }[];
}

export class MessageGroup extends Block {
  constructor(props: IMessageGroupProps) {
    super({
      ...props,
      messages: props.messages.map((message) => new MessageItem({ ...message })),
    });
  }

  protected render(): string {
    return `
      <div class="messages-group-container">
        <time class="messages-group-container__datetime-block">{{date}}</time>
        {{{ messages }}}
      </div>
      `;
  }
}
