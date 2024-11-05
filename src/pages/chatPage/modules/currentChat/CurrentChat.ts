import Block, { BlockProps } from "../../../../globalClasses/Block";
import { UserInterface } from "../../../../globalClasses/StoreUpdated";

import { CurrentChatHeader } from "../currentChatHeader/CurrentChatHeader";
import { MessagesBlock } from "../messagesBlock/MessagesBlock";
import { CurrentChatFooter } from "../currentChatFooter/CurrentChatFooter";

import { IMessageProps } from "../../partials/messageItem/MessageItem";

import { isEqual } from "../../../../utils";

import "./currentChat.scss";

// interface IMessageGroup {
//   date: string;
//   messages: IMessageProps[];
// }

export interface CurrentChatProps {
  id?: number;
  avatar?: string;
  title?: string;
  initials?: string;
  active?: boolean;
  allMessages?: any[];
  popupOpen?: boolean;
  isEmpty?: boolean;
  events?: Record<string, (event: Event) => void>;
  webSocketInstance?: WebSocket | null;
  activeChatId?: number | null;
  userInfo?: UserInterface;
  currentChat?: any;
  messages?: IMessageProps[];
}

export default class CurrentChat extends Block {
  constructor(props?: CurrentChatProps) {
    if (props) {
      super({
        ...props,
        Header: new CurrentChatHeader({ ...props }),
        MessageBlock: new MessagesBlock({ messages: props.messages }),
        // Footer: new CurrentChatFooter({ ...props, popupOpen: props.popupOpen }),
        events: {
          submit: (event: Event) => {
            event.preventDefault();
            const elem = event.target as HTMLFormElement;
            if (elem && elem.tagName === "FORM") {
              const formData = new FormData(event.target as HTMLFormElement);
              const message = formData.get("message")?.toString();

              const webSocketInstance = (this.props as CurrentChatProps).webSocketInstance;
              if (message && webSocketInstance) {
                console.log(message);
                webSocketInstance.send(
                  JSON.stringify({
                    content: message,
                    type: "message",
                  }),
                );
              }
            }
          },
        },
      });
    } else super({});
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    console.log(oldProps, newProps);
    if (!isEqual(oldProps, newProps)) {
      this.children.Header.setProps({ ...newProps });
      this.children.MessageBlock.setProps({ messages: newProps.messages });
    }
  }

  protected render(): string {
    return ` 
    <div class="current-chat-container">
      {{#if currentChat.id}}
        <header>{{{ Header }}}</header>
        <main>{{{ MessageBlock }}}</main>
        <footer>{{{ Footer }}}</footer>
      {{else}}
        <p class="current-chat_empty">Выберите чат чтобы отправить сообщение</p>
      {{/if}}
    </div>
    `;
  }
}
