import Block, { BlockProps } from "../../../../globalClasses/Block";
import { isEqual } from "../../../../utils";
import { IMessageProps, MessageItem } from "../messageItem/MessageItem";

import "./messageGroup.scss";

interface IMessageGroupProps {
  date: string;
  messages?: IMessageProps[]; // Делаем messages необязательным
}

export class MessageGroup extends Block {
  constructor(props: IMessageGroupProps) {
    // Создаём массив сообщений или оставляем пустым
    const messages = props.messages ? props.messages.map((message) => new MessageItem({ ...message })) : []; // Пустой массив при отсутствии сообщений

    super({
      ...props,
      messages, // Используем обработанный массив сообщений или пустой массив
    });
  }

  // protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
  //   if (!isEqual(oldProps.messages, newProps.messages)) {
  //     const messages = newProps.messages
  //       ? (newProps.messages as IMessageProps[]).map((message) => new MessageItem({ ...message }))
  //       : [];

  //     // Проверяем, отличается ли массив сообщений от нового
  //     console.log(!isEqual(this.lists.messages, messages));
  //     if (!isEqual(this.lists.messages, messages)) {
  //       this.setProps({ messages });
  //     }
  //     return true;
  //   }
  //   return false;
  // }

  protected render(): string {
    return `
      <div class="messages-group-container">
        <time class="messages-group-container__datetime-block">{{date}}</time>
        {{{ messages }}}
      </div>
    `;
  }
}
