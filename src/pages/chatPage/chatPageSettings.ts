import { OverlayProps } from "../../components/overlay/Overlay";
import Router from "../../globalClasses/Router";
import { ChatItemProps } from "./partials/chatItem/ChatItem";
import { ProfileLinkProps } from "./partials/profileLink/profileLink";

export const profileLinkSettings: ProfileLinkProps = {
  linkText: "Профиль",
  linkClass: "chat-page__aside__profile-link",
  iconClass: "chat-page__aside__profile-link__icon",
  iconUrl: "/icons/profile_icon.png",
  onClick: (event: Event) => {
    const router = Router.getInstance("app");
    router.go("/settings");
    event.preventDefault();
    event.stopPropagation();
  },
};

export const modalWindowAddChatSettings: OverlayProps = {
  title: "Создать чат",
  inputOptions: {
    isFile: false,
    labelName: "Имя чата",
    labelFor: "title",
    inputId: "title",
    inputName: "title",
    inputType: "input",
    inputPlaceholder: "Введите имя чата",
    errorText: "",
    fileName: "",
    validation: (value: string) => (!value ? "Введите имя чата" : null),
    events: {},
  },
  buttonOptions: {
    value: "Создать",
    type: "submit",
    class: "submit-button",
    id: "change-btn",
    name: "submit-btn",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
    },
  },
  overlayEvents: {
    click: (event: Event) => {
      event.stopPropagation();
    },
  },
};

export const createChatButtonSettings = {
  class: "submit-button",
  modifierClass: "chat-page__aside__create-chat-btn",
  value: "Создать чат",
  type: "button",
  id: "create-btn",
  name: "create-btn",
  events: {
    click: (event: Event) => {
      console.log("click");
      // const router = Router.getInstance("app");
      // router.go("/dialogues");
      event.preventDefault();
      event.stopPropagation();
    },
  },
};

export const mockChatsData: ChatItemProps[] = [
  {
    id: 1,
    avatar: "/icons/profile_icon.png",
    created_by: 1,
    last_message: "Привет, как дела?",
    title: "Chat 1",
    unread_count: 0,
  },
  {
    id: 2,
    avatar: "/icons/profile_icon.png",
    created_by: 1,
    last_message: "Привет, как дела?",
    title: "Chat 2",
    unread_count: 0,
  },
  {
    id: 3,
    avatar: "/icons/profile_icon.png",
    created_by: 1,
    last_message: "Привет, как дела?",
    title: "Chat 3",
    unread_count: 0,
  },
];

export const modalWindowAddUserSettings1 = {
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
  events: {}, // Добавить пустые обработчики событий или конкретные функции, если нужно
  overlayEvents: {},
};

export const modalWindowAddUserSettings: OverlayProps = {
  title: "Добавить пользователя",
  inputOptions: {
    isFile: false,
    labelName: "Логин",
    labelFor: "login",
    inputId: "login",
    inputName: "login",
    inputType: "input",
    inputPlaceholder: "Введите логин",
    errorText: "",
    fileName: "",
    validation: (value: string) => (!value ? "Введите логин" : null),
    events: {},
  },
  buttonOptions: {
    value: "Добавить",
    type: "submit",
    class: "submit-button",
    id: "change-btn",
    name: "submit-btn",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
    },
  },
  overlayEvents: {
    click: (event: Event) => {
      event.stopPropagation();
    },
  },
};
