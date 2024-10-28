import { OverlayProps } from "../../components/overlay/Overlay";
import Router from "../../globalClasses/Router";
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
