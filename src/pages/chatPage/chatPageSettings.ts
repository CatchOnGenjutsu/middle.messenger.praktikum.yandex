import Router from "../../globalClasses/Router";
import { OverlayProps } from "../../components/overlay/Overlay";
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
    validation: (value: string) => (!value ? "Введите имя чата" : ""),
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
      event.preventDefault();
      event.stopPropagation();
    },
  },
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
    validation: (value: string) => (!value ? "Введите логин" : ""),
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

export const modalWindowDeleteUserSettings: OverlayProps = {
  title: "Удалить пользователя",
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
    validation: (value: string) => (!value ? "Введите логин" : ""),
    events: {},
  },
  buttonOptions: {
    value: "Удалить",
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

export const burgerActionButtonsSettings = [
  {
    label: "Добавить пользователя",
    alt: "Добавить пользователя",
    id: "add-user",
    icon: "/icons/add_user_icon.png",
  },
  {
    label: "Удалить пользователя",
    alt: "Удалить пользователя",
    id: "delete-user",
    icon: "/icons/delete_user_icon.png",
  },
  {
    label: "Удалить чат",
    alt: "Удалить чат",
    icon: "/icons/trashcan_icon.png",
  },
];

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
