import Router from "./globalClasses/Router";
import { connect } from "./globalClasses/HOCupdated";

import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import ChatPage from "./pages/chatPage/ChatPage";
import ProfilePage, { ProfilePageProps } from "./pages/profilePage/ProfilePage";
import ErrorPage from "./pages/errorPage/ErrorPage";
import userApi from "./api/userApi";
import StoreUpdated from "./globalClasses/StoreUpdated";

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
      .setNotFoundPage(ErrorPage)
      .start();
    this.getUser();
  }

  async getUser(): Promise<void> {
    try {
      const request = await userApi.request();
      if (request.status === 200) {
        const data = JSON.parse(request.response);
        StoreUpdated.set("userInfo", data);
      } else throw new Error(`${request.status}`);
      if (localStorage.getItem("auth") && window.location.pathname === "/") {
        const router = Router.getInstance("app");
        router.go("/messenger");
      }
    } catch (error) {
      if ((error as Error).message && ((error as Error).message as string).includes("401")) {
        localStorage.removeItem("auth");
        const router = Router.getInstance("app");
        router.go("/");
      }
    }
  }

  render(): string {
    return "";
  }
}
