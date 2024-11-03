import Block, { BlockProps } from "../../../../globalClasses/Block";
import StoreUpdated from "../../../../globalClasses/StoreUpdated";
import ChatItem, { ChatItemProps } from "../../partials/chatItem/ChatItem";

import "./chatList.scss";

export interface ChatListProps extends BlockProps {
  chats?: ChatItemProps[];
  activeChatId?: number;
}

export default class ChatList extends Block {
  constructor(props: ChatListProps) {
    const chatList =
      props.chats?.map(
        (chat) =>
          new ChatItem({
            ...chat,
            events: {
              click: () => this.handleItemClick(chat.id),
            },
          }),
      ) || [];
    super({
      ...props,
      chatList: chatList,
    });
  }

  // Создаем элемент чата с передачей обработчика клика
  private _createChatItem(chat: ChatItemProps): ChatItem {
    return new ChatItem({
      ...chat,
      events: {
        click: () => this.handleItemClick(chat.id),
      },
    });
  }

  // Метод обновления списка чатов
  private _updateChatList(newChats: ChatItemProps[] = []) {
    const chatList = newChats.map((chat) => this._createChatItem(chat));
    this.setProps({ chatList }); // Обновляем chatList в пропсах компонента
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (oldProps.chats !== newProps.chats) {
      this._updateChatList(newProps.chats as ChatItemProps[]);
      return true;
    }
    return false;
  }

  // Обработчик клика по элементу чата
  private handleItemClick(chatId: number) {
    this.lists.chatList.map((chat) => chat.setProps({ active: chat.props.id === chatId }));
    // debugger;
    StoreUpdated.set("ChatPage.activeChatId", chatId);
    const chats = (this.props as ChatListProps).chats;
    if (chats?.length) {
      const currentChat = chats.find((chat: ChatItemProps) => chat.id === chatId);

      if (currentChat) {
        console.log(currentChat);
        StoreUpdated.set("ChatPage.currentChat", currentChat);
      }
    }
    // this.setProps({ activeChatId: chatId }); // Устанавливаем активный чат
  }

  render() {
    return `
      <ul class="chat-list">
        {{{chatList}}}
      </ul>
    `;
  }
}
