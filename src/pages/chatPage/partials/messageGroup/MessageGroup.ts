import Block, { BlockProps } from "../../../../globalClasses/Block";
import { IMessageProps, MessageItem } from "../messageItem/MessageItem";

import "./messageGroup.scss";

interface IMessageGroupProps {
  date: string;
  messages?: IMessageProps[];
}

export class MessageGroup extends Block {
  constructor(props: IMessageGroupProps) {
    super({
      ...props,
      messages: [],
    });

    if (props.messages) {
      this._updateMessages(props.messages);
    }
  }

  private _updateMessages(newMessages: IMessageProps[] = []) {
    const messages = [...newMessages.map((message) => new MessageItem({ ...message }))];
    this.setProps({ messages: [...messages] });
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (
      (oldProps.messages === undefined && newProps.messages !== undefined) ||
      (oldProps.messages as Array<unknown>).length !== (newProps.messages as Array<unknown>).length
    ) {
      console.log(oldProps.messages, newProps.messages);
      this._updateMessages(newProps.messages as IMessageProps[]);
      return true;
    }
    return false;
  }

  protected render(): string {
    return `
      <div class="messages-group-container">
        <time class="messages-group-container__datetime-block">{{date}}</time>
        {{{messages}}}
      </div>
    `;
  }
}
