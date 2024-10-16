type Subscriber<State> = (state: State) => void;

interface Store<State, Action> {
  getState(): State;
  subscribe(fn: Subscriber<State>): void;
  dispatch(action: Action): void;
}

export interface StoreState {
  PageTitle: string;
}

interface SetTextAction {
  type: "SET_TEXT";
  PageTitle: string;
}

type Action = SetTextAction;

const deepCopy = <T>(object: T): T => JSON.parse(JSON.stringify(object));

const reducer = (state: StoreState, action: Action): StoreState => {
  const newState = deepCopy(state);

  if (action.type === "SET_TEXT") {
    console.log("SET_TEXT");
    newState.PageTitle = action.PageTitle;
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
  PageTitle: "Initial state text",
};

const store = createStore(reducer, initialState);

export default store;
