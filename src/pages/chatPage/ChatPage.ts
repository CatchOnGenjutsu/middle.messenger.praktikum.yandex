import Block from "../../globalClasses/Block";
import SearchInput from "./partials/searchInput/SearchInput";
import ChatList from "./modules/chatList/ChatList";
import CurrentChat from "./modules/currentChat/CurrentChat";

import { chatPageOpenSettings } from "./mockData";
import { profileLinkSettings } from "./chatPageSettings";

import "./chatPage.scss";
import { ProfileLink } from "./partials/profileLink/profileLink";

export default class ChatPage extends Block {
  constructor() {
    super({
      ProfileLink: new ProfileLink({ ...profileLinkSettings }),
      SearchInput: new SearchInput(),
      ChatList: new ChatList(),
      CurrentChat: new CurrentChat({ ...chatPageOpenSettings }),
    });
  }

  protected render(): string {
    return `
    <div class="chat-page" id="chat-page">
      <aside class="chat-page__aside">
        {{{ ProfileLink }}}
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
