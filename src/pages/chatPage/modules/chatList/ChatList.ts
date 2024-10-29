import Block, { BlockProps } from "../../../../globalClasses/Block";
import { ChatItem, ChatItemProps } from "../../partials/chatItem/ChatItem";

import "./chatList.scss";

export default class ChatList extends Block {
  constructor(props: any) {
    super({
      activeChatId: null,
      chats: props.chats,
      // chatList: ChatList.createChatList(props.chats, this.handleItemClick.bind(this)),
    });

    this.children.chatList = this.createChatList(props.chats);
  }

  // Создаем список чатов с передачей обработчика клика
  private createChatList(chats: ChatItemProps[]): ChatItem[] {
    return chats.map(
      (chat: ChatItemProps) =>
        new ChatItem({
          ...chat,
          events: {
            click: () => this.handleItemClick(chat.id),
          },
        }),
    );
  }

  // Обновление списка чатов
  private updateChatList(chats: ChatItemProps[]) {
    this.children.chatList = this.createChatList(chats);
    this.setProps({}); // Принудительный ререндеринг
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (oldProps.chats !== newProps.chats) {
      this.updateChatList(newProps.chats as ChatItemProps[]);
      return true;
    }
    return false;
  }

  // Обработчик клика по элементу чата
  private handleItemClick(chatId: number) {
    this.setProps({ activeChatId: chatId });
  }

  render() {
    return `
      <ul class="chat-list">
        {{#each chatList}}
          {{{this}}}
        {{/each}}
      </ul>
    `;
  }
}
