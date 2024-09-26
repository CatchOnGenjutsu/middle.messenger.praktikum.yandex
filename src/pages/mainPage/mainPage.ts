import Block from "../../globalClasses/Block";
import "./mainPage.scss";

export default class MainPage extends Block {
  constructor() {
    super();
  }

  override render() {
    return `
      <nav id="navigation" class="navigation">
        <a class="navigation__link" href="/login">Login</a>
        <a class="navigation__link" href="/chat-page">Chat Page</a>
        <a class="navigation__link" href="/profile-page">Profile View Mode</a>
        <a class="navigation__link" href="#profilePageEditPasswordMode">Profile Edit Password Mode</a>
        <a class="navigation__link" href="#errorPage404">Error 404</a>
        <a class="navigation__link" href="#errorPage500">Error 500</a>
      </nav>
    `;
  }
}
