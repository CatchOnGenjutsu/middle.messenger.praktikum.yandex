import Block from "../../globalClasses/Block";
import SearchInput from "./partials/searchInput/SearchInput";
import ChatList from "./modules/chatList/ChatList";

import "./chatPage.scss";

export default class ChatPage extends Block {
  constructor(props?: any) {
    super({ ...props, SearchInput: new SearchInput({}), ChatList: new ChatList({}) });
  }

  protected render(): string {
    return `
    <div class="chat-page" id="chat-page">
      <aside class="chat-page__aside">
        <a href="/profile" class="chat-page__aside__profile-link">
          Профиль <img class="chat-page__aside__profile-link__icon" src="/icons/profile_icon.png" alt="profile icon"/>
        </a>
        {{{ SearchInput }}}
        {{{ ChatList }}}
      </aside>
      <main>
      </main>
    </div>
    `;
  }
}
