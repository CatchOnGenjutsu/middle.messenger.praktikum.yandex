// import Router from "./globalClasses/Router";
// import { connect } from "./globalClasses/HOC";

import Router from "./globalClasses/Router";
import { connect } from "./globalClasses/HOC";

import MainPage from "./pages/mainPage/mainPage";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import ChatPage from "./pages/chatPage/ChatPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import ErrorPage from "./pages/errorPage/ErrorPage";

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
    const loginPage = connect(Login);
    const registrationPage = connect(Registration);
    const chatPage = connect(ChatPage);
    // const profilePage = connect(ProfilePage);
    const router = new Router("app");
    router
      .use("/", loginPage)
      .use("/sign-up", registrationPage)
      .use("/messenger", chatPage)
      // .use("/settings", profilePage)
      .start();
  }

  render(): string {
    return "";
  }
}
