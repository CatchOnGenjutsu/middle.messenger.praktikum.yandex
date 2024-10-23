import Router from "./globalClasses/Router";
// import { connect } from "./globalClasses/HOC";
import { connect } from "./globalClasses/HOCupdated";

import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import ChatPage from "./pages/chatPage/ChatPage";
import ProfilePage, { ProfilePageProps } from "./pages/profilePage/ProfilePage";
import ErrorPage from "./pages/errorPage/ErrorPage";

// interface AppState {
//   currentPage: string;
// }
export default class App {
  constructor() {
    const loginPage = connect(() => ({}))(Login);
    const registrationPage = connect(() => ({}))(Registration);
    const chatPage = connect(() => ({}))(ChatPage);
    const profilePage = connect<ProfilePageProps>((state) => ({ ...state.ProfilePageState }))(ProfilePage);
    const router = Router.getInstance("app");

    router
      .use("/", loginPage)
      .use("/sign-up", registrationPage)
      .use("/messenger", chatPage)
      .use("/settings", profilePage)
      .setNotFoundPage(ErrorPage) // Устанавливаем страницу 404
      .start();
  }

  render(): string {
    return "";
  }
}
