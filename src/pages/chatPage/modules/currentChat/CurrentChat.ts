import Block from "../../../../globalClasses/Block";
import { UserInterface } from "../../../../globalClasses/StoreUpdated";

import { CurrentChatHeader } from "../currentChatHeader/CurrentChatHeader";
import { MessagesBlock } from "../messagesBlock/MessagesBlock";
import { CurrentChatFooter } from "../currentChatFooter/CurrentChatFooter";

import "./currentChat.scss";

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

interface CurrentChatProps {
  id: number;
  avatar?: string;
  chatName: string;
  initials?: string;
  active: boolean;
  allMessages: IMessageGroup[];
  popupOpen: boolean;
  isEmpty?: boolean;
  events?: Record<string, (event: Event) => void>;
  webSocketInstance?: WebSocket | null;
  activeChatId?: number | null;
  userInfo?: UserInterface;
}

export default class CurrentChat extends Block {
  constructor(props?: CurrentChatProps) {
    if (props) {
      super({
        ...props,
        Header: new CurrentChatHeader({ ...props }),
        MessageBlock: new MessagesBlock({ ...props, allMessages: props.allMessages }),
        Footer: new CurrentChatFooter({ ...props, popupOpen: props.popupOpen }),
        events: {
          submit: (event: Event) => {
            event.preventDefault();
            const elem = event.target as HTMLFormElement;
            console.log(elem);
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

  init(): void {
    super.init();
    console.log(this.props);
    // this.setProps({
    //   isEmpty: !Object.values(this.props).length,
    // });
  }

  protected render(): string {
    return ` 
    <div class="current-chat-container">
      {{#if activeChatId}}
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
