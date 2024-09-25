import MainPage from "./pages/mainPage/mainPage";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import ChatPage from "./pages/chatPage/ChatPage";

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
          this.appElement.replaceWith(mainPage.getContent());
        }
        break;
      }

      case "login": {
        const login = new Login();
        console.log(login.getContent());
        if (this.appElement) {
          this.appElement.replaceWith(login.getContent());
        }
        break;
      }
      case "registration": {
        const registration = new Registration();
        console.log(registration.getContent());
        if (this.appElement) {
          this.appElement.replaceWith(registration.getContent());
        }
        break;
      }
      case "chat-page": {
        const chatPage = new ChatPage();
        console.log(chatPage.getContent());
        if (this.appElement) {
          this.appElement.replaceWith(chatPage.getContent());
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
