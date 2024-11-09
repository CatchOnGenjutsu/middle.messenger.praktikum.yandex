import EventBus from "./EventBus";
import { set } from "../utils";
import { modalWindowAddChatSettings } from "../pages/chatPage/chatPageSettings";
import { IMessageProps } from "../pages/chatPage/partials/messageItem/MessageItem";
import { CurrentChatProps } from "../pages/chatPage/modules/currentChat/CurrentChat";

export interface UserInterface {
  avatar: string | null;
  display_name: string | null;
  email: string | null;
  first_name: string | null;
  id: number | null;
  login: string | null;
  phone: string | null;
  second_name: string | null;
}

interface StoreInterface {
  ProfilePageState: {
    userInfo: UserInterface | {};
    isEditData: boolean;
    editMainData: boolean;
    newAvatar: string;
  };
  ChatPage: {
    overlaySettings: any;
    activeChatId?: number | null;
    currentChat: CurrentChatProps;
    messages?: IMessageProps[];
    socket: WebSocket | null;
  };
  userInfo: UserInterface;
}

export enum StoreEvents {
  Updated = "updated",
}

class StoreUpdated<Store extends StoreInterface> extends EventBus {
  private state: Store;

  constructor(initialState: Store = {} as Store) {
    super();
    this.state = initialState;
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated, this.state);
  }
}

const initialState: StoreInterface = {
  ProfilePageState: {
    userInfo: {},
    isEditData: false,
    editMainData: true,
    newAvatar: "",
  },
  ChatPage: {
    overlaySettings: modalWindowAddChatSettings,
    currentChat: {} as CurrentChatProps,
    socket: null,
  },
  userInfo: {
    avatar: null,
    display_name: null,
    email: null,
    first_name: null,
    id: null,
    login: null,
    phone: null,
    second_name: null,
  },
};

export default new StoreUpdated(initialState);
