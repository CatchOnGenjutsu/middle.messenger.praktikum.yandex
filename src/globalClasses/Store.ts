interface State {
  PageTitle: string;
}

interface SetTextAction {
  type: "SET_TEXT";
  payload: { PageTitle: string };
}

type Action = SetTextAction;

const deepCopy = <T>(object: T): T => {
  if (object === null || typeof object !== "object") return object;
  if (object instanceof Date) return new Date(object) as T;
  if (Array.isArray(object)) return object.map((item) => deepCopy(item)) as unknown as T;
  if (object instanceof Map) {
    return new Map(Array.from(object.entries()).map(([k, v]) => [deepCopy(k), deepCopy(v)])) as T;
  }
  if (object instanceof Set) {
    return new Set(Array.from(object).map((item) => deepCopy(item))) as T;
  }
  const cloned: Record<string, unknown> = {};
  Object.keys(object).forEach((key) => (cloned[key] = deepCopy((object as Record<string, unknown>)[key])));
  return cloned as T;
};

const reducer = (state: State, action: Action): State => {
  const newState = deepCopy(state);

  if (action.type === "SET_TEXT") {
    newState.PageTitle = action.payload.PageTitle;
  }

  return newState;
};

const createStore = <S, A>(reducer: (state: S, action: A) => S, initialState: S) => {
  const subscribers: Array<(state: S) => void> = [];
  let currentState = initialState;

  return {
    getState: () => currentState,
    subscribe: (fn: (state: S) => void) => {
      subscribers.push(fn);
      fn(currentState);
    },
    dispatch: (action: A) => {
      currentState = reducer(currentState, action);
      subscribers.forEach((fn) => fn(currentState));
    },
  };
};

const state: State = { PageTitle: "Initial state text" };
const store = createStore(reducer, state);
Object.freeze(store);

export default store;
