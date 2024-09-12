import Handlebars from "handlebars";
import { Login } from "./pages/login/login";
import { Registration } from "./pages/registration/registration";
import { ChatPage } from "./pages/chatPage/chatPage";
import * as components from "./components/components";
import * as chatPageComponents from "./pages/chatPage/chatPageComponents";

import {
  loginPageSettings,
  loginButtonOptions,
  registrationPageSettings,
  registrationButtonOptions,
  chatPageOpenSettings,
  chatPageOpenPopupsSettings,
  chatPageOpenModalSettings,
} from "./constants";
import { chatsData, chatTestData, emptyChatsData } from "./pages/chatPage/mockData";
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
    default:
      break;
  }
}

window.addEventListener("hashchange", handleRoute);
