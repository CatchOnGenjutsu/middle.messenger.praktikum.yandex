import Block from "../../../../globalClasses/Block";
import { MessageGroup } from "../../partials/messageGroup/MessageGroup";
import { IMessageProps } from "../../partials/messageItem/MessageItem";

import "./messagesBlock.scss";

interface IMessageGroup {
  date: string;
  messages: IMessageProps[];
}

interface IMessageBlockProps {
  messages?: IMessageProps[];
  allMessages?: IMessageGroup[];
}

function groupMessagesByDate(messages: IMessageProps[]): IMessageGroup[] {
  return messages.reduce<IMessageGroup[]>((acc, message) => {
    const date = message.time.split("T")[0];
    let group = acc.find((g) => g.date === date);

    if (!group) {
      group = { date, messages: [] };
      acc.push(group);
    }

    group.messages.push(message);

    return acc;
  }, []);
}

export class MessagesBlock extends Block {
  constructor(props: IMessageBlockProps) {
    if (props.messages) {
      const groupedMessages = groupMessagesByDate(props.messages);

      super({
        ...props,
        allMessages: groupedMessages,
        messagesGroups: [...groupedMessages.map((group) => new MessageGroup({ ...group }))],
      });
    } else {
      super({ ...props });
    }
  }

  protected render(): string {
    return `
    <div class="messages-block-container">
      {{{ messagesGroups }}}
    </div>
    `;
  }
}
