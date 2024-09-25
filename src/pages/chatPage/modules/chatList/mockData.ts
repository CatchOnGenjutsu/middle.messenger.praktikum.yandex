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
  events?: {
    click: (event: Event) => void;
  };
}

export const chatsData: ChatItemProps[] = [
  {
    id: 1,
    chatName: "Вася",
    //сделать хелпер для инициалов
    initials: "ВС",
    avatar: "https://i.pravatar.cc/300?img=1",
    lastMessage: "Hello. Тут я напишу длинный текст для того чтобы проверить как работает перенос текста.",
    lastMessageTime: "10:00",
    incoming: true,
    unreadMessagesCount: 0,
    active: true,
  },
  {
    id: 2,
    chatName: "Петя",
    initials: "ПТ",
    avatar: "",
    lastMessage: "Hi",
    lastMessageTime: "11:00",
    incoming: false,
    unreadMessagesCount: 2,
    active: false,
  },
  {
    id: 3,
    chatName: "Коля",
    initials: "КЛ",
    avatar: "https://i.pravatar.cc/300?img=3",
    lastMessage: "Yo",
    lastMessageTime: "12:00",
    incoming: true,
    unreadMessagesCount: 0,
    active: false,
  },
];
