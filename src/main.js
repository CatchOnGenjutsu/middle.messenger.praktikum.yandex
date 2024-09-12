import Handlebars from "handlebars";
import { Login } from "./pages/login/login";
import { Registration } from "./pages/registration/registration";
import { ChatPage } from "./pages/chatPage/chatPage";
import { ProfilePage } from "./pages/profilePage/profilePage";
import { ErrorPage } from "./pages/errorPage/errorPage";
import * as components from "./components/components";
import * as chatPageComponents from "./pages/chatPage/chatPageComponents";
import * as profilePageComponents from "./pages/profilePage/profilePageComponents";

import {
  loginPageSettings,
  loginButtonOptions,
  registrationPageSettings,
  registrationButtonOptions,
  chatPageOpenSettings,
  chatPageOpenPopupsSettings,
  chatPageOpenModalSettings,
  profilePageMainDataSettings,
  saveButtonOptions,
} from "./constants";
import { chatsData, emptyChatsData } from "./pages/chatPage/mockData";
import {
  burgerActionButtonsSettings,
  addAppsActionButtonsSettings,
  modalWindowSettings,
} from "./pages/chatPage/pageSettings";

for (let component in components) {
  Handlebars.registerPartial(component, components[component]);
}

for (let component in chatPageComponents) {
  Handlebars.registerPartial(component, chatPageComponents[component]);
}

for (let component in profilePageComponents) {
  Handlebars.registerPartial(component, profilePageComponents[component]);
}

function renderLogin() {
  const app = document.querySelector("#app");
  const login = Handlebars.compile(Login);
  app.innerHTML = login({
    inputsSettings: loginPageSettings,
    buttonOptions: loginButtonOptions,
  });
}

function renderRegistration() {
  const app = document.querySelector("#app");
  const registration = Handlebars.compile(Registration);
  app.innerHTML = registration({
    inputsSettings: registrationPageSettings,
    buttonOptions: registrationButtonOptions,
  });
}

function renderChatActivePage() {
  const app = document.querySelector("#app");
  const chatPage = Handlebars.compile(ChatPage);
  app.innerHTML = chatPage({
    chatList: chatsData,
    currentChat: chatPageOpenSettings,
    burgerButtons: burgerActionButtonsSettings,
    addAppsButtons: addAppsActionButtonsSettings,
    modalWindowSettings: modalWindowSettings,
  });
}

function renderPopupsChatPage() {
  const app = document.querySelector("#app");
  const chatPage = Handlebars.compile(ChatPage);
  app.innerHTML = chatPage({
    chatList: chatsData,
    currentChat: chatPageOpenPopupsSettings,
    burgerButtons: burgerActionButtonsSettings,
    addAppsButtons: addAppsActionButtonsSettings,
    modalWindowSettings: modalWindowSettings,
  });
}
function renderModalChatPage() {
  const app = document.querySelector("#app");
  const chatPage = Handlebars.compile(ChatPage);
  app.innerHTML = chatPage({
    chatList: chatsData,
    currentChat: chatPageOpenModalSettings,
    burgerButtons: burgerActionButtonsSettings,
    addAppsButtons: addAppsActionButtonsSettings,
    modalWindowSettings: modalWindowSettings,
  });
}
function renderEmptyChatPage() {
  const app = document.querySelector("#app");
  const chatPage = Handlebars.compile(ChatPage);
  app.innerHTML = chatPage({
    chatList: emptyChatsData,
    currentChat: { isEmpty: true },
    burgerButtons: burgerActionButtonsSettings,
    addAppsButtons: addAppsActionButtonsSettings,
    modalWindowSettings: modalWindowSettings,
  });
}

function renderProfilePage() {
  const app = document.querySelector("#app");
  const profilePage = Handlebars.compile(ProfilePage);
  app.innerHTML = profilePage({
    inputsSettings: profilePageMainDataSettings,
    buttonOptions: saveButtonOptions,
  });
}

function renderErrorPage404() {
  const app = document.querySelector("#app");
  const errorPage = Handlebars.compile(ErrorPage);
  app.innerHTML = errorPage({
    error: {
      title: "404",
      description: "Не туда попали",
    },
  });
}

function renderErrorPage500() {
  const app = document.querySelector("#app");
  const errorPage = Handlebars.compile(ErrorPage);
  app.innerHTML = errorPage({
    error: {
      title: "500",
      description: "Мы уже фиксим",
    },
  });
}
function handleRoute() {
  const hash = window.location.hash;

  if (!hash || hash === "#") {
    window.location.href = "index.html";
    return;
  }

  switch (hash) {
    case "#login":
      renderLogin();
      break;
    case "#registration":
      renderRegistration();
      break;
    case "#activeChatPage":
      renderChatActivePage();
      break;
    case "#popupsChatPage":
      renderPopupsChatPage();
      break;
    case "#modalChatPage":
      renderModalChatPage();
      break;
    case "#emptyChatPage":
      renderEmptyChatPage();
      break;
    case "#profilePage":
      renderProfilePage();
      break;
    case "#errorPage404":
      renderErrorPage404();
      break;
    case "#errorPage500":
      renderErrorPage500();
      break;
    default:
      break;
  }
}

window.addEventListener("hashchange", handleRoute);
