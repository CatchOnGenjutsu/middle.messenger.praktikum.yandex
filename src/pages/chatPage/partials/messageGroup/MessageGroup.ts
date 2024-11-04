import Block from "../../../../globalClasses/Block";
import { IMessageProps, MessageItem } from "../messageItem/MessageItem";

import "./messageGroup.scss";

interface IMessageGroupProps {
  date: string;
  messages: IMessageProps[];
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
