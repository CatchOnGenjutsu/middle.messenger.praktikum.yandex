import Router from "./globalClasses/Router";
// import { connect } from "./globalClasses/HOC";
import { connect } from "./globalClasses/HOCupdated";

import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import ChatPage, { ChatPageProps } from "./pages/chatPage/ChatPage";
import ProfilePage, { ProfilePageProps } from "./pages/profilePage/ProfilePage";
import ErrorPage from "./pages/errorPage/ErrorPage";
import userApi from "./api/userApi";
import StoreUpdated from "./globalClasses/StoreUpdated";

// interface AppState {
//   currentPage: string;
// }
export default class App {
  constructor() {
    const loginPage = connect(() => ({}))(Login);
    const registrationPage = connect(() => ({}))(Registration);
    const chatPage = connect((state) => ({ ...state.ChatPage, userInfo: state.userInfo }))(ChatPage);
    const profilePage = connect<ProfilePageProps>((state) => ({ ...state.ProfilePageState }))(ProfilePage);
    const router = Router.getInstance("app");

    router
      .use("/", loginPage)
      .use("/sign-up", registrationPage)
      .use("/messenger", chatPage)
      .use("/settings", profilePage)
      .setNotFoundPage(ErrorPage) // Устанавливаем страницу 404
      .start();
    this.getUser();
    if (localStorage.getItem("auth")) {
      router.go("/messenger");
    }
  }

  async getUser(): Promise<void> {
    try {
      const request = await userApi.request();
      if (request.status === 200) {
        const data = JSON.parse(request.response);
        StoreUpdated.set("userInfo", data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  render(): string {
    return "";
  }
}
