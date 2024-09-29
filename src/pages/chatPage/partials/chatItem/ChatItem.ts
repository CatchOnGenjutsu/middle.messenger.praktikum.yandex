import Block from "../../../../globalClasses/Block";
import "./chatItem.scss";

interface ChatItemProps {
  id: number;
  avatar?: string;
  chatName: string;
  lastMessage: string;
  lastMessageTime: string;
  initials?: string;
  incoming?: boolean;
  active?: boolean;
  unreadMessagesCount?: number;
  activeChatId?: number | null;
  events?: {
    click: (event: Event) => void;
  };
}

export class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({ ...props });
    this.setProps({
      active: this.props.id === this.props.activeChatId,
    });
  }

  render() {
    return `
      <li class="chat-item {{#if active}}chat-item_active{{/if}}">
        <div class="chat-item__avatar">
          {{#if avatar}}
            <img class="chat-item__avatar__avatar-img" src="{{avatar}}" alt="avatar">
          {{else}}
            <div class="chat-item__avatar__avatar-placeholder">{{initials}}</div>
          {{/if}}
        </div>
        <div class="chat-item__info">
          <div class="chat-item__info__name">{{chatName}}</div>
          <div class="chat-item__info__last-message">{{#if incoming}}<span>Вы: </span>{{/if}}{{lastMessage}}</div>
        </div>
        <div class="chat-item__chat-settings">
          <div class="chat-item__chat-settings__time">{{lastMessageTime}}</div>
          {{#if unreadMessagesCount}}<div class="chat-item__chat-settings__unread-messages">{{unreadMessagesCount}}</div>{{/if}}
        </div>
      </li>
    `;
  }
}
