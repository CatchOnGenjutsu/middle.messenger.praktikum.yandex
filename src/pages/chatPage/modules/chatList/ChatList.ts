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
    super({
      ...props,
      chatList: props.chats?.map((chat) => this._createChatItem(chat)) || [],
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
    StoreUpdated.set("ChatPage.activeChatId", chatId);
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

// import Block, { BlockProps } from "../../../../globalClasses/Block";
// import ChatItem, { ChatItemProps } from "../../partials/chatItem/ChatItem";

// import "./chatList.scss";

// export interface ChatListProps extends BlockProps {
//   chats?: ChatItemProps[];
//   activeChatId?: number;
// }

// export default class ChatList extends Block {
//   constructor(props: ChatListProps) {
//     console.log("ChatList", props);

//     // Создаем список чатов ДО вызова super()
//     const chatList =
//       props.chats?.map(
//         (chat) =>
//           new ChatItem({
//             ...chat,
//             events: {
//               click: () => this.handleItemClick(chat.id),
//             },
//           }),
//       ) || [];

//     // Вызов super с правильными пропсами
//     super({
//       ...props,
//       activeChatId: null,
//       chatList,
//     });
//   }

//   // Метод обновления списка чатов
//   private _updateChatList(newChats: ChatItemProps[] = []) {
//     // console.log("Обновление списка чатов:", newChats);
//     const chatList = newChats.map(
//       (chat) =>
//         new ChatItem({
//           ...chat,
//           events: {
//             click: () => this.handleItemClick(chat.id),
//           },
//         }),
//     );
//     this.setProps({ chatList }); // Обновляем chatList в пропсах компонента
//   }

//   protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
//     // console.log("ChatList componentDidUpdate", oldProps, newProps);
//     if (oldProps.chats !== newProps.chats) {
//       this._updateChatList(newProps.chats as ChatItemProps[]);
//       // return true;
//     }
//     // return false;
//   }

//   // Обработчик клика по элементу чата
//   private handleItemClick(chatId: number) {
//     this.setProps({ activeChatId: chatId }); // Устанавливаем активный чат
//   }

//   render() {
//     return `
//       <ul class="chat-list">
//         {{{chatList}}}
//       </ul>
//     `;
//   }
// }
