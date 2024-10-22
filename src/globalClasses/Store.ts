type Subscriber<State> = (state: State) => void;

interface Store<State, Action> {
  getState(): State;
  subscribe(fn: Subscriber<State>): void;
  dispatch(action: Action): void;
}

export interface StoreState {
  userInfo: Record<string, string | null>;
  // RegistrationPageSettings: FormFieldConfig[];
}

interface SetTextAction {
  type: "SET_TEXT";
  PageTitle: string;
}
interface SetFormFieldsAction {
  type: "SET_FORM_FIELDS";
  // fields: FormFieldConfig[];
}
interface SetUserInfoAction {
  type: "SET_USER_INFO";
  userInfo: Record<string, string | null>;
}
interface LogoutAction {
  type: "LOGOUT";
}

type Action = SetTextAction | SetFormFieldsAction | SetUserInfoAction | LogoutAction;

function deepCopy<T>(object: T, seen = new WeakMap()): T {
  if (object === null || typeof object !== "object") {
    return object;
  }

  if (seen.has(object)) {
    return seen.get(object);
  }

  if (object instanceof Date) {
    return new Date(object.getTime()) as T;
  }

  if (Array.isArray(object)) {
    const copy: any[] = [];
    seen.set(object, copy);
    for (const item of object) {
      copy.push(deepCopy(item, seen));
    }
    return copy as T;
  }

  if (object instanceof Map) {
    const copy = new Map();
    seen.set(object, copy);
    for (const [key, value] of object.entries()) {
      copy.set(deepCopy(key, seen), deepCopy(value, seen));
    }
    return copy as T;
  }

  if (object instanceof Set) {
    const copy = new Set();
    seen.set(object, copy);
    for (const item of object) {
      copy.add(deepCopy(item, seen));
    }
    return copy as T;
  }

  const copy: { [key: string]: any } = {};
  seen.set(object, copy);

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      copy[key] = deepCopy((object as { [key: string]: any })[key], seen);
    }
  }

  return copy as T;
}

const reducer = (state: StoreState, action: Action): StoreState => {
  const newState = action.type === "LOGOUT" ? initialState : deepCopy(state);

  switch (action.type) {
    case "SET_USER_INFO":
      // console.log(action.userInfo);
      newState.userInfo = { ...action.userInfo };
      // console.log(newState.userInfo);
      break;
    case "LOGOUT":
      return newState;

    default:
      break;
  }

  return newState;
};

const createStore = <State, Action>(
  reducer: (state: State, action: Action) => State,
  initialState: State,
): Store<State, Action> => {
  const subscribers: Subscriber<State>[] = [];
  let currentState = initialState;

  return {
    getState: () => currentState,
    subscribe: (fn) => {
      subscribers.push(fn);
      fn(currentState);
    },
    dispatch: (action) => {
      currentState = reducer(currentState, action);
      subscribers.forEach((fn) => fn(currentState));
    },
  };
};

const initialState: StoreState = {
  userInfo: {},
};
const store = Object.freeze(createStore(reducer, initialState));

export default store;
