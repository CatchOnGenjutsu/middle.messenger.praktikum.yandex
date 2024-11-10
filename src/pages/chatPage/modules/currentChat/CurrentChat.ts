import Block, { BlockProps } from "../../../../globalClasses/Block";
import StoreUpdated, { UserInterface } from "../../../../globalClasses/StoreUpdated";

import { CurrentChatHeader } from "../currentChatHeader/CurrentChatHeader";
import { CurrentChatFooter } from "../currentChatFooter/CurrentChatFooter";

import { isEqual } from "../../../../utils";

import "./currentChat.scss";
import MessageBlockTest, { IMessageBlockTestProps } from "../messageBlockTest/messageBlockTest";

export interface CurrentChatProps extends BlockProps {
  events?: Record<string, (event: Event) => void>;
  webSocketInstance?: WebSocket | null;
  activeChatId?: number | null;
  userInfo?: UserInterface;
  currentChat?: Record<string, unknown>;
  messages: IMessageBlockTestProps;
  popupOpen?: boolean;
}

export default class CurrentChat extends Block {
  constructor(props: CurrentChatProps) {
    super({
      ...props,
      Header: new CurrentChatHeader({ ...props }),
      MessageBlockTest: new MessageBlockTest(CurrentChat.getMessagesProps(props)),
      Footer: new CurrentChatFooter({
        activeChatId: props?.activeChatId,
        webSocketInstance: props?.webSocketInstance,
        events: {
          submit: (event: Event) => {
            event.preventDefault();

            const form = event.target as HTMLFormElement;
            if (form) {
              const formData = new FormData(form);
              const message = formData.get("message")?.toString()?.trim();
              console.log(StoreUpdated.getState().ChatPage.socket);
              if (message && message.length > 0 && StoreUpdated.getState().ChatPage.socket) {
                StoreUpdated.getState().ChatPage.socket?.send(
                  JSON.stringify({
                    content: message,
                    type: "message",
                  }),
                );
                form.reset();
              }
            }
          },
        },
      }),
    });
  }

  static getMessagesProps(props: any): IMessageBlockTestProps {
    return { ...props.messages };
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    if (!isEqual(oldProps.currentChat, newProps.currentChat)) {
      this.children.Header.setProps({ currentChat: newProps.currentChat });
    }

    if (!isEqual(oldProps.messages, newProps.messages)) {
      this.children.MessageBlockTest.setProps(CurrentChat.getMessagesProps(newProps));
    }
  }

  protected render(): string {
    return `
    <div class="current-chat-container">
      {{#if currentChat.id}}
        <header>{{{ Header }}}</header>
        <main>{{{ MessageBlockTest }}}</main>
        <footer>{{{ Footer }}}</footer>
      {{else}}
        <p class="current-chat_empty">Выберите чат, чтобы отправить сообщение</p>
      {{/if}}
    </div>
    `;
  }
}
