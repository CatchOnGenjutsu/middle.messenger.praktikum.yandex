import MainPage from "./pages/mainPage/mainPage";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";

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
    if (this.state.currentPage === "") {
      const mainPage = new MainPage();
      console.log(mainPage.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(mainPage.getContent());
      }
    }
    if (this.state.currentPage === "login") {
      const login = new Login();
      console.log(login.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(login.getContent());
      }
    }
    if (this.state.currentPage === "registration") {
      const registration = new Registration();
      console.log(registration.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(registration.getContent());
      }
    }
    return "";
  }
}
