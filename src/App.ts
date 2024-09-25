import Handlebars from "handlebars";

import MainPage from "./pages/mainPage/mainPage";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import ChatPage from "./pages/chatPage/ChatPage";
import { MessageItem } from "./pages/chatPage/partials/messageItem/MessageItem";

interface AppState {
  currentPage: string;
}
export default class App {
  private state: AppState;

  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: window.location.pathname.slice(1),
    };
    this.appElement = document.getElementById("app");

    Handlebars.registerHelper("renderMessage", (message) => {
      const messageItem = new MessageItem({ ...message });
      return messageItem.render(); // Возвращаем HTML-содержимое
    });
  }

  render(): string {
    switch (this.state.currentPage) {
      case "": {
        const mainPage = new MainPage();
        console.log(mainPage.getContent());
        if (this.appElement) {
          this.appElement.appendChild(mainPage.getContent());
        }
        break;
      }

      case "login": {
        const login = new Login();
        console.log(login.getContent());
        if (this.appElement) {
          this.appElement.appendChild(login.getContent());
        }
        break;
      }
      case "registration": {
        const registration = new Registration();
        console.log(registration.getContent());
        if (this.appElement) {
          this.appElement.appendChild(registration.getContent());
        }
        break;
      }
      case "chat-page": {
        const chatPage = new ChatPage();
        console.log(chatPage.getContent());
        if (this.appElement) {
          this.appElement.appendChild(chatPage.getContent());
        }
        break;
      }
      default: {
        const mainPage = new MainPage();
        console.log(mainPage.getContent());
        if (this.appElement) {
          this.appElement.replaceWith(mainPage.getContent());
        }
        break;
      }
    }
    return "";
  }
}
