import Block, { BlockProps } from "../../../../globalClasses/Block";
import { isEqual } from "../../../../utils";
import { MessageGroup } from "../../partials/messageGroup/MessageGroup";
import { IMessageProps } from "../../partials/messageItem/MessageItem";

import "./messagesBlock.scss";

interface IMessageGroup {
  date: string;
  messages: IMessageProps[];
}

interface IMessageBlockProps {
  messages: IMessageProps[];
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

// export class MessagesBlock extends Block {
//   constructor(props: IMessageBlockProps) {
//     const groupedMessages = props.messages ? groupMessagesByDate(props.messages) : [];

//     super({
//       ...props,
//       allMessages: groupedMessages,
//       messagesGroups: groupedMessages.map((group) => new MessageGroup({ ...group })),
//     });
//   }

//   private _createMessageGroup(group: IMessageGroup): MessageGroup {
//     return new MessageGroup({ ...group });
//   }

//   // Метод обновления групп сообщений
//   private _updateMessageGroups(newMessages: IMessageProps[] = []) {
//     const groupedMessages = groupMessagesByDate(newMessages);
//     const newMessageGroups = groupedMessages.map((group) => this._createMessageGroup(group));
//     this.setProps({ messagesGroups: newMessageGroups });
//   }

//   protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
//     if (!isEqual(oldProps.messages, newProps.messages)) {
//       if (newProps.messages) {
//         this._updateMessageGroups(newProps.messages as IMessageProps[]);
//         return true;
//       }
//     }
//     return false;
//   }

//   protected render(): string {
//     return `
//       <div class="messages-block-container">
//         {{{ messagesGroups }}}
//       </div>
//     `;
//   }
// }

export class MessagesBlock extends Block {
  constructor(props: IMessageBlockProps) {
    super({
      ...props,
      allMessages: [],
      messagesGroups: [],
    });

    if (props.messages) {
      this._updateMessageGroups(props.messages);
    }
  }

  private _createMessageGroup(group: IMessageGroup): MessageGroup {
    return new MessageGroup({ ...group });
  }

  // Метод обновления групп сообщений
  private _updateMessageGroups(newMessages: IMessageProps[] = []) {
    const groupedMessages = groupMessagesByDate(newMessages);
    const newMessageGroups = groupedMessages.map((group) => this._createMessageGroup(group));
    this.setProps({ messagesGroups: newMessageGroups });
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (!isEqual(oldProps.messages, newProps.messages)) {
      this._updateMessageGroups(newProps.messages as IMessageProps[]);
      return true;
    }
    return false;
  }
  // {{{ messagesGroups }}}
  protected render(): string {
    return `
      <div class="messages-block-container">
        {{{messagesGroups}}}
      </div>
    `;
  }
}
