import chatsApi from "../../../../api/chatsApi";
import Block, { BlockProps } from "../../../../globalClasses/Block";
import StoreUpdated, { UserInterface } from "../../../../globalClasses/StoreUpdated";
import webSocketTransport from "../../../../globalClasses/websocket";
import ChatItem, { ChatItemProps } from "../../partials/chatItem/ChatItem";

import "./chatList.scss";

export interface ChatListProps extends BlockProps {
  chats?: ChatItemProps[];
  activeChatId?: number;
}

// export default class ChatList extends Block {
//   constructor(props: ChatListProps) {
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
//     super({
//       ...props,
//       chatList: chatList,
//     });
//   }

//   private _createChatItem(chat: ChatItemProps): ChatItem {
//     return new ChatItem({
//       ...chat,
//       events: {
//         click: () => this.handleItemClick(chat.id),
//       },
//     });
//   }

//   // Метод обновления списка чатов
//   private _updateChatList(newChats: ChatItemProps[] = []) {
//     const chatList = newChats.map((chat) => this._createChatItem(chat));
//     this.setProps({ chatList });
//   }

//   protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
//     if (oldProps.chats !== newProps.chats) {
//       this._updateChatList(newProps.chats as ChatItemProps[]);
//       return true;
//     }
//     return false;
//   }
//   async getChatToken(chatId: number): Promise<string | null> {
//     try {
//       const request = await chatsApi.getChatToken(chatId);
//       if (request.status === 200) {
//         const data = JSON.parse(request.response);
//         return data.token;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.error("Ошибка при получении информации о чатах:", error);
//       return null;
//     }
//   }

//   private async handleItemClick(chatId: number) {
//     this.lists.chatList.map((chat) => chat.setProps({ active: chat.props.id === chatId }));
//     const response = await this.getChatToken(chatId);
//     if (response) {
//       const token = response;

//       webSocketTransport(chatId, StoreUpdated.getState().userInfo as unknown as UserInterface, token).then(
//         (socket) => {
//           StoreUpdated.set("ChatPage.socket", socket);
//         },
//       );
//     }

//     StoreUpdated.set("ChatPage.activeChatId", chatId);
//     const chats = (this.props as ChatListProps).chats;
//     if (chats?.length) {
//       const currentChat = chats.find((chat: ChatItemProps) => chat.id === chatId);

//       if (currentChat) {
//         StoreUpdated.set("ChatPage.currentChat", currentChat);
//       }
//     }
//   }

//   render() {
//     return `
//       <ul class="chat-list">
//         {{{chatList}}}
//       </ul>
//     `;
//   }
// }

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
    this.setProps({ chatList });
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    if (oldProps.chats !== newProps.chats) {
      this._updateChatList(newProps.chats as ChatItemProps[]);
      return true;
    }
    return false;
  }

  async getChatToken(chatId: number): Promise<string | null> {
    try {
      const request = await chatsApi.getChatToken(chatId);
      if (request.status === 200) {
        const data = JSON.parse(request.response);
        return data.token;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Ошибка при получении информации о чатах:", error);
      return null;
    }
  }

  private async handleItemClick(chatId: number) {
    // Устанавливаем текущий чат активным
    this.lists.chatList.map((chat) => chat.setProps({ active: chat.props.id === chatId }));

    // Закрываем предыдущее WebSocket-соединение, если оно существует
    const previousSocket = StoreUpdated.getState().ChatPage.socket;
    if (previousSocket !== null) {
      (previousSocket as WebSocket).close();
    }

    // Получаем новый токен для чата
    const response = await this.getChatToken(chatId);
    if (response) {
      const token = response;

      // Создаём новое WebSocket-соединение
      webSocketTransport(chatId, StoreUpdated.getState().userInfo as unknown as UserInterface, token).then(
        (socket) => {
          StoreUpdated.set("ChatPage.socket", socket);
        },
      );
    }

    // Обновляем состояние чата
    StoreUpdated.set("ChatPage.activeChatId", chatId);
    const chats = (this.props as ChatListProps).chats;
    if (chats?.length) {
      const currentChat = chats.find((chat: ChatItemProps) => chat.id === chatId);

      if (currentChat) {
        StoreUpdated.set("ChatPage.currentChat", currentChat);
      }
    }
  }

  render() {
    return `
      <ul class="chat-list">
        {{{chatList}}}
      </ul>
    `;
  }
}
