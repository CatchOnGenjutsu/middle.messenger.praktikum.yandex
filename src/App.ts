import Handlebars from "handlebars";

import MainPage from "./pages/mainPage/mainPage";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import ChatPage from "./pages/chatPage/ChatPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import {
  modalWindowAddAvatarSettings,
  profileActionsButtonsSettings,
  profilePageViewModeMainDataSettings,
  saveButtonOptions,
} from "./pages/profilePage/mockData";

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
      case "profile-page": {
        const profilePage = new ProfilePage({
          ...profilePageViewModeMainDataSettings,
          buttonOptions: { ...saveButtonOptions },
          actionsButtons: { ...profileActionsButtonsSettings },
          modalWindowSettings: { ...modalWindowAddAvatarSettings },
        });
        console.log(profilePage.getContent());
        if (this.appElement) {
          this.appElement.appendChild(profilePage.getContent());
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
