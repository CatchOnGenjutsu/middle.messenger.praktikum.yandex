interface MessageProps {
  id: number;
  content: string;
  incoming: boolean;
  type: "text" | "image";
  isImage: boolean;
  messageTime?: string;
  isRead?: boolean;
}

interface MessageGroup {
  date: string;
  messages: MessageProps[];
}

interface CurrentChatProps {
  id: number;
  chatName: string;
  initials: string;
  avatar: string;
  active: boolean;
  allMessages: MessageGroup[];
  popupOpen: boolean;
}

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

export const chatPageOpenSettings: CurrentChatProps = {
  id: 1,
  chatName: "Вася",
  //сделать хелпер для инициалов
  initials: "ВС",
  avatar: "https://i.pravatar.cc/300?img=1",
  active: true,
  allMessages: [
    {
      date: "19 июня",
      messages: [
        {
          id: 1,
          content:
            "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. \n\n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
          incoming: true,
          type: "text",
          isImage: false,
          messageTime: "10:00",
        },
        {
          id: 11,
          content:
            "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. \n\n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
          incoming: true,
          type: "text",
          isImage: false,
          messageTime: "10:00",
        },
        {
          id: 111,
          content:
            "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. \n\n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
          incoming: true,
          type: "text",
          isImage: false,
          messageTime: "10:00",
        },
        {
          id: 2,
          content: "/assets/image_example.png",
          incoming: true,
          type: "image",
          isImage: true,
          messageTime: "10:01",
        },
        {
          id: 3,
          content: "Круто!",
          incoming: false,
          type: "text",
          isImage: false,
          messageTime: "10:02",
          isRead: true,
        },
      ],
    },
    {
      date: "20 июня",
      messages: [
        {
          id: 4,
          content: "Привет!",
          incoming: true,
          type: "text",
          isImage: false,
          messageTime: "10:01",
        },
        {
          id: 5,
          content:
            "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. \n\n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
          incoming: false,
          type: "text",
          isImage: false,
          messageTime: "10:02",
          isRead: false,
        },
      ],
    },
  ],
  popupOpen: false,
  // modalOpen: false,
};

export const addAppsActionButtonsSettings = [
  {
    label: "Фото или Видео",
    alt: "Фото или Видео",
    icon: "/icons/add_image_icon.png",
  },
  {
    label: "Файл",
    alt: "Файл",
    icon: "/icons/add_file_icon.png",
  },
  {
    label: "Локация",
    alt: "Локация",
    icon: "/icons/add_location_icon.png",
  },
];

export const burgerActionButtonsSettings = [
  {
    label: "Добавить пользователя",
    alt: "Добавить пользователя",
    icon: "/icons/add_user_icon.png",
  },
  {
    label: "Удалить пользователя",
    alt: "Удалить пользователя",
    icon: "/icons/delete_user_icon.png",
  },
  {
    label: "Удалить чат",
    alt: "Удалить чат",
    icon: "/icons/trashcan_icon.png",
  },
];

export const modalWindowSettings = {
  title: "Добавить пользователя",
  inputOptions: {
    labelName: "Логин",
    labelFor: "login",
    inputId: "login",
    inputName: "login",
    inputType: "text",
    inputPlaceholder: "Введите логин",
    errorText: "",
  },
  buttonOptions: {
    value: "Добавить",
    type: "submit",
    class: "submit-button",
    id: "submit-btn",
    name: "submit-btn",
  },
};

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
