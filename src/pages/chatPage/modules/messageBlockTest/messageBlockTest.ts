import Block, { BlockProps } from "../../../../globalClasses/Block";
import { isEqual } from "../../../../utils";
import { IMessageProps, MessageItem } from "../../partials/messageItem/MessageItem";

import "./messageBlockTest.scss";

export interface IMessageBlockTestProps extends BlockProps {
  messages?: IMessageProps[];
}

export default class MessageBlockTest extends Block {
  constructor(props: IMessageBlockTestProps) {
    const messagesListFromProps =
      props.messages?.map(
        (message: IMessageProps) =>
          new MessageItem({
            ...message,
          }),
      ) || [];
    super({ ...props, messagesList: messagesListFromProps });
  }

  private _createMessageItem(message: IMessageProps): MessageItem {
    return new MessageItem({
      ...message,
    });
  }

  private _updateMessagesList(newMessages: IMessageProps[] = []) {
    if (Array.isArray(newMessages)) {
      const messagesList = newMessages?.map((message) => this._createMessageItem(message));
      this.setProps({ messagesList });
    }
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (!isEqual(oldProps.messages, newProps.messages)) {
      this._updateMessagesList(newProps.messages as IMessageProps[]);
      return true;
    }
    return false;
  }

  render() {
    return `
      <div class="messages-block-test">
        {{{messagesList}}}
      </div>
    `;
  }
}
