import Block from "../../../../globalClasses/Block";
import "./chatItem.scss";

export interface ChatItemProps {
  id: number;
  avatar: string | null;
  created_by: number;
  last_message: string | null;
  title: string;
  unread_count: number;

  // id: number;
  // avatar?: string;
  // chatName: string;
  // lastMessage: string;
  // lastMessageTime: string;
  // initials?: string;
  // incoming?: boolean;
  // active?: boolean;
  // unreadMessagesCount?: number;
  // activeChatId?: number | null;
  events?: {
    click: (event: Event) => void;
  };
}

export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    console.log("ChatItem", props);
    super({ ...props });
    // this.setProps({
    //   active: this.props.id === this.props.activeChatId,
    // });
  }
  // <li class="chat-item {{#if active}}chat-item_active{{/if}}">
  //       <div class="chat-item__avatar">
  //         {{#if avatar}}
  //           <img class="chat-item__avatar__avatar-img" src="{{avatar}}" alt="avatar">
  //         {{else}}
  //           <div class="chat-item__avatar__avatar-placeholder">{{initials}}</div>
  //         {{/if}}
  //       </div>
  //       <div class="chat-item__info">
  //         <div class="chat-item__info__name">{{chatName}}</div>
  //         <div class="chat-item__info__last-message">{{#if incoming}}<span>Вы: </span>{{/if}}{{lastMessage}}</div>
  //       </div>
  //       <div class="chat-item__chat-settings">
  //         <div class="chat-item__chat-settings__time">{{lastMessageTime}}</div>
  //         {{#if unreadMessagesCount}}<div class="chat-item__chat-settings__unread-messages">{{unreadMessagesCount}}</div>{{/if}}
  //       </div>
  //     </li>

  //   <li class="chat-item {{#if active}}chat-item_active{{/if}}">
  //   <div class="chat-item__avatar">
  //     {{#if avatar}}
  //       <img class="chat-item__avatar__avatar-img" src="{{avatar}}" alt="avatar">
  //     {{else}}
  //       <div class="chat-item__avatar__avatar-placeholder">{{initials}}</div>
  //     {{/if}}
  //   </div>
  //   <div class="chat-item__info">
  //     <div class="chat-item__info__name">{{title}}</div>
  //     <div class="chat-item__info__last-message">{{#if incoming}}<span>Вы: </span>{{/if}}{{lastMessage}}</div>
  //   </div>
  //   <div class="chat-item__chat-settings">
  //     <div class="chat-item__chat-settings__time">{{lastMessageTime}}</div>
  //     {{#if unread_count}}<div class="chat-item__chat-settings__unread-messages">{{unread_count}}</div>{{/if}}
  //   </div>
  // </li>

  render() {
    return `
      <li class="chat-item__info">
        <div class="chat-item__info__name">{{title}}</div>
      </li>
    `;
  }
}
