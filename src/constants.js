export const loginPageSettings = {
  login: {
    labelName: "Логин",
    id: "login",
    name: "login",
    type: "text",
    placeholder: "Введите логин",
    errorText: "Неверный логин",
  },
  password: {
    labelName: "Пароль",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Введите пароль",
  },
};

export const loginButtonOptions = {
  value: "Войти",
  type: "submit",
  class: "submit-button",
  id: "submit-btn",
  name: "submit-btn",
};

export const registrationButtonOptions = {
  value: "Зарегистрироваться",
  type: "submit",
  class: "submit-button",
  id: "submit-btn",
  name: "submit-btn",
};

export const registrationPageSettings = {
  email: {
    labelName: "Почта",
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Введите почту",
    errorText: "Неверная почта",
  },
  login: {
    labelName: "Логин",
    id: "login",
    name: "login",
    type: "text",
    placeholder: "Введите логин",
  },
  first_name: {
    labelName: "Имя",
    id: "first_name",
    name: "first_name",
    type: "text",
    placeholder: "Введите имя",
  },
  second_name: {
    labelName: "Фамилия",
    id: "second_name",
    name: "second_name",
    type: "text",
    placeholder: "Введите фамилию",
  },
  phone: {
    labelName: "Телефон",
    id: "phone",
    name: "phone",
    type: "text",
    placeholder: "Введите телефон",
  },
  password: {
    labelName: "Пароль",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Введите пароль",
  },
  passwordRe: {
    labelName: "Пароль",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Введите пароль(ещё раз)",
  },
};

export const chatPageOpenSettings = {
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
        },
        {
          id: 5,
          content:
            "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. \n\n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
          incoming: false,
          type: "text",
          messageTime: "10:02",
          isRead: false,
        },
      ],
    },
  ],
  popupsOpen: false,
  modalOpen: false,
};

export const chatPageOpenPopupsSettings = {
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
        },
        {
          id: 5,
          content:
            "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. \n\n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
          incoming: false,
          type: "text",
          messageTime: "10:02",
          isRead: false,
        },
      ],
    },
  ],
  popupsOpen: true,
  modalOpen: false,
};

export const chatPageOpenModalSettings = {
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
        },
        {
          id: 5,
          content:
            "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. \n\n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
          incoming: false,
          type: "text",
          messageTime: "10:02",
          isRead: false,
        },
      ],
    },
  ],
  popupsOpen: false,
  modalOpen: true,
};

export const profilePageViewModeMainDataSettings = {
  isEditData: false,
  avatarUrl: "",
  inputOptions: {
    email: {
      labelName: "Почта",
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Введите почту",
      value: "E7R5v@example.com",
    },
    login: {
      labelName: "Логин",
      id: "login",
      name: "login",
      type: "text",
      placeholder: "Введите логин",
      value: "login123",
    },
    first_name: {
      labelName: "Имя",
      id: "first_name",
      name: "first_name",
      type: "text",
      placeholder: "Введите имя",
      value: "Иван",
    },
    second_name: {
      labelName: "Фамилия",
      id: "second_name",
      name: "second_name",
      type: "text",
      placeholder: "Введите фамилию",
      value: "Иванов",
    },
    display_name: {
      labelName: "Имя в чате",
      id: "display_name",
      name: "display_name",
      type: "text",
      placeholder: "Введите имя в чате",
      value: "Иван",
    },
    phone: {
      labelName: "Телефон",
      id: "phone",
      name: "phone",
      type: "text",
      placeholder: "Введите телефон",
      value: "+7 999 999 99 99",
      isLast: true,
    },
  },
};

export const saveButtonOptions = {
  value: "Сохранить",
  type: "submit",
  class: "submit-button",
  id: "submit-btn",
  name: "submit-btn",
};

export const profileActionsButtonsSettings = {
  editData: {
    text: "Изменить данные",
    modifierClass: "button--primary",
  },
  editPassword: {
    text: "Изменить пароль",
    modifierClass: "button--primary",
  },
  exit: {
    text: "Выйти",
    modifierClass: "button--danger",
    isLast: true,
  },
};

export const profilePageEditModeMainDataSettings = {
  ...profilePageViewModeMainDataSettings,
  isEditData: true,
};

export const profilePageEditPasswordDataSettings = {
  ...profilePageViewModeMainDataSettings,
  isEditData: true,
  inputOptions: {
    oldPassword: {
      labelName: "Старый пароль",
      id: "oldPassword",
      name: "oldPassword",
      type: "password",
      placeholder: "Старый пароль",
      value: "12345678",
    },
    newPassword: {
      labelName: "Новый пароль",
      id: "newPassword",
      name: "newPassword",
      type: "password",
      placeholder: "Новый пароль",
      value: "12345678",
    },
    newPasswordRepeat: {
      labelName: "Повторите новый пароль",
      id: "newPasswordRepeat",
      name: "newPasswordRepeat",
      type: "password",
      placeholder: "Повторите новый пароль",
      value: "12345678",
      isLast: true,
    },
  },
};

export const modalWindowAddAvatarSettings = {
  title: "Загрузите файл",
  inputOptions: {
    labelName: "Выбрать файл на компьютере",
    id: "avatar",
    name: "avatar",
    type: "file",
    placeholder: "Выберите аватар",
    errorText: "",
    isFile: true,
  },
  buttonOptions: {
    value: "Поменять",
    type: "submit",
    class: "submit-button",
    id: "submit-btn",
    name: "submit-btn",
  },
};
