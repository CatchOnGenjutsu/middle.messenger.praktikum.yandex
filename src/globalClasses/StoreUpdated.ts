import EventBus from "./EventBus";
import { set } from "../utils";

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
    console.log(path, value);
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
});
