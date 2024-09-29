import Block from "../../../../globalClasses/Block";

import "./messageItem.scss";

interface IMessageProps {
  id: number;
  content: string;
  incoming: boolean;
  isImage: boolean;
  messageTime?: string;
  type: string;
  isRead?: boolean;
}
export class MessageItem extends Block {
  constructor(props: IMessageProps) {
    super({ ...props });
  }

  render() {
    return `
      {{#if incoming}}
        <div class="message-item message-item_incoming">
          {{#if isImage}}
            <img class="message-item__image" src="{{content}}" alt="image">
            {{else}}
            <div class="message-item__text">{{content}}</div>
          {{/if}}
          <div class="message-info">
            <span class="message-time">{{messageTime}}</span>
          </div>
        </div>
      {{else}}
        <div class="message-item message-item_outgoing {{#if isRead}}message-item_outgoing_read{{/if}}">
          {{#if isImage}}
            <img class="message-item__image" src="{{content}}" alt="image">
            {{else}}
            <div class="message-item__text">{{content}}</div>
          {{/if}}
          <div class="message-info">
              {{#if isRead}}
                <span class="message-status"></span>
              {{/if}}
              <span class="message-time">{{messageTime}}</span>
          </div>
        </div>
      {{/if}}
    `;
  }
}
