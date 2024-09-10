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
} from "./constants";
import { chatsData } from "./pages/chatPage/mockData";

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

function renderChatPage() {
  const app = document.querySelector("#app");
  const chatPage = Handlebars.compile(ChatPage);
  app.innerHTML = chatPage({
    chatList: chatsData,
  });
}
function handleRoute() {
  const hash = window.location.hash;

  switch (hash) {
    case "#login":
      renderLogin();
      break;
    case "#registration":
      renderRegistration();
      break;
    case "#chatPage":
      renderChatPage();
      break;
    default:
      break;
  }
}

window.addEventListener("hashchange", handleRoute);
