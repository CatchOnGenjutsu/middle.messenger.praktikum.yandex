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
    const groupedMessages = props.messages ? groupMessagesByDate(props.messages) : [];

    super({
      ...props,
      allMessages: groupedMessages,
      messagesGroups: groupedMessages.map((group) => new MessageGroup({ ...group })),
    });
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (!isEqual(oldProps.messages, newProps.messages)) {
      if (newProps.messages) {
        const groupedMessages = groupMessagesByDate(newProps.messages as IMessageProps[]);

        const newMessageGroups = groupedMessages.map((group) => new MessageGroup({ ...group }));
        if (!isEqual(this.children.messagesGroups, newMessageGroups)) {
          this.setProps({ messagesGroups: newMessageGroups });
        }
      }
      return true;
    }
    return false;
  }

  protected render(): string {
    return `
    <div class="messages-block-container">
      {{{ messagesGroups }}}
    </div>
    `;
  }
}
// export class MessagesBlock extends Block {
//   constructor(props: IMessageBlockProps) {
//     if (props.messages) {
//       const groupedMessages = groupMessagesByDate(props.messages);

//       super({
//         ...props,
//         allMessages: groupedMessages,
//         messagesGroups: [...groupedMessages.map((group) => new MessageGroup({ ...group }))],
//       });
//     } else {
//       super({ ...props });
//     }
//   }

//   protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
//     if (!isEqual(oldProps, newProps)) {
//       console.log("Messages обновлен", newProps.messages);

//       if (newProps.messages) {
//         const groupedMessages = groupMessagesByDate(newProps.messages as IMessageProps[]);
//         console.log("groupedMessages", groupedMessages);
//         console.log(this.children.messagesGroups);
//         if (this.children.messagesGroups) {
//           this.children.messagesGroups.setProps({
//             ...groupedMessages.map((group) => new MessageGroup({ ...group })),
//           });
//         }
//       }
//     }
//   }

//   protected render(): string {
//     return `
//     <div class="messages-block-container">
//       {{{ messagesGroups }}}
//     </div>
//     `;
//   }
// }
