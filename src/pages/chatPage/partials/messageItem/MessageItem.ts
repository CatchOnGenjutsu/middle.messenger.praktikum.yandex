import Block from "../../../../globalClasses/Block";
import StoreUpdated from "../../../../globalClasses/StoreUpdated";

import "./messageItem.scss";

export interface IMessageProps {
  chat_id: number;
  content: string;
  file: File | null;
  id: number;
  is_read: boolean;
  time: string; // Формат времени ISO 8601
  type: unknown; // или другие возможные типы, если есть
  user_id: number;
}
export class MessageItem extends Block {
  constructor(props: IMessageProps) {
    super({
      ...props,
      incoming: props.user_id === StoreUpdated.getState().userInfo.id ? false : true,
      time: props.time.slice(11, 16),
    });
  }

  render() {
    return `
      {{#if incoming}}
        <div class="message-item message-item_incoming">
          {{#if file}}
            <img class="message-item__image" src="{{file}}" alt="image">
            {{else}}
            <div class="message-item__text">{{content}}</div>
          {{/if}}
          <div class="message-info">
            <span class="message-time">{{time}}</span>
          </div>
        </div>
      {{else}}
        <div class="message-item message-item_outgoing {{#if is_read}}message-item_outgoing_read{{/if}}">
          {{#if file}}
            <img class="message-item__image" src="{{file}}" alt="image">
            {{else}}
            <div class="message-item__text">{{content}}</div>
          {{/if}}
          <div class="message-info">
              {{#if is_read}}
                <span class="message-status"></span>
              {{/if}}
              <span class="message-time">{{time}}</span>
          </div>
        </div>
      {{/if}}
    `;
  }
}
