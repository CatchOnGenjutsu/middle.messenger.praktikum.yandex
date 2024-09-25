import Block from "../../../../globalClasses/Block";
import { MessageItem } from "../../partials/messageItem/MessageItem";

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
    // const allMessages = props.allMessages.map((group) => ({
    //   ...group,
    //   messages: group.messages.map((message) => new MessageItem({ ...message })),
    // }));

    super({
      ...props,
      // allMessages,
    });
  }

  protected render(): string {
    return `
    <div class="messages-block-container">
      {{#each allMessages}}
      <time class="messages-block-container__datetime-block">{{date}}</time>
        {{#each messages}}
          {{{renderMessage this}}} <!-- Вызываем функцию для рендеринга сообщения -->
        {{/each}}
      {{/each}}
    </div>
    `;
  }

  renderMessage(message: IMessageProps) {
    const messageItem = new MessageItem({ ...message });
    return messageItem.render(); // Возвращаем строку HTML
  }
}
