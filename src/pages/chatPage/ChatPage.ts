import Block from "../../globalClasses/Block";
import SearchInput from "./partials/searchInput/SearchInput";
import ChatList from "./modules/chatList/ChatList";
import CurrentChat from "./modules/currentChat/CurrentChat";

import { chatPageOpenSettings } from "./mockData";

import "./chatPage.scss";

export default class ChatPage extends Block {
  constructor() {
    super({
      SearchInput: new SearchInput(),
      ChatList: new ChatList(),
      CurrentChat: new CurrentChat({ ...chatPageOpenSettings }),
    });
  }

  protected render(): string {
    return `
    <div class="chat-page" id="chat-page">
      <aside class="chat-page__aside">
        <a href="/profile-page" class="chat-page__aside__profile-link">
          Профиль <img class="chat-page__aside__profile-link__icon" src="/icons/profile_icon.png" alt="profile icon"/>
        </a>
        {{{ SearchInput }}}
        {{{ ChatList }}}
      </aside>
      <main>
        {{{ CurrentChat }}}
      </main>
    </div>
    `;
  }
}
