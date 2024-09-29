import Block from "../../../../globalClasses/Block";
import { ChatItem } from "../../partials/chatItem/ChatItem";

import { chatsData } from "../../mockData";

import "./chatList.scss";

export default class ChatList extends Block {
  constructor() {
    super({
      activeChatId: null,
      chatList: [
        ...chatsData.map(
          (chat) =>
            new ChatItem({
              ...chat,
              events: {
                click: (event: Event) => this.handleItemClick.bind(this)(event),
              },
            }),
        ),
      ],
    });
  }

  handleItemClick(event: Event) {
    if (!event) return;
    const target = event.target as HTMLInputElement;
    if (target) {
      this.setProps({ activeChatId: 2 });
    }
  }

  render() {
    return `
      <ul class="chat-list">
        {{#if chatList.length}}
          {{{ chatList }}}
        {{/if}}  
      </ul>
    `;
  }
}
