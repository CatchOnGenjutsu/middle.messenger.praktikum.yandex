import Block from "../../../../globalClasses/Block";
import { MessageGroup } from "../../partials/messageGroup/MessageGroup";

import "./messagesBlock.scss";

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

interface IMessageBlockProps {
  allMessages: IMessageGroup[];
}
export class MessagesBlock extends Block {
  constructor(props: IMessageBlockProps) {
    super({
      ...props,
      messagesGroups: [...props.allMessages.map((group) => new MessageGroup({ ...group }))],
    });
  }

  protected render(): string {
    return `
    <div class="messages-block-container">
      {{{ messagesGroups }}}
    </div>
    `;
  }
}
