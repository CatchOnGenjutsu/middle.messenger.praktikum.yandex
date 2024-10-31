import EventBus from "./EventBus";
import { set } from "../utils";
import { modalWindowAddChatSettings } from "../pages/chatPage/chatPageSettings";

export interface UserInterface {
  avatar: string | null;
  display_name: string | null;
  email: string | null;
  first_name: string | null;
  id: number;
  login: string | null;
  phone: string | null;
  second_name: string | null;
}

export enum StoreEvents {
  Updated = "updated",
}

class StoreUpdated<Store extends Record<string, unknown>> extends EventBus {
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

    // Вызываем событие с новым состоянием
    this.emit(StoreEvents.Updated, this.state);
  }
}

export default new StoreUpdated({
  ProfilePageState: {
    userInfo: {},
    isEditData: false,
    editMainData: true,
    newAvatar: "",
  },
  ChatPage: {
    overlaySettings: modalWindowAddChatSettings,
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
  messages: [],
});
