import { FormFieldConfig, registrationFormFieldsConfig } from "./interfaces";
type Subscriber<State> = (state: State) => void;

interface Store<State, Action> {
  getState(): State;
  subscribe(fn: Subscriber<State>): void;
  dispatch(action: Action): void;
}

export interface StoreState {
  PageTitle: string;
  // LoginPageSettings: FormFieldConfig[];
  RegistrationPageSettings: FormFieldConfig[];
}

interface SetTextAction {
  type: "SET_TEXT";
  PageTitle: string;
}
interface SetFormFieldsAction {
  type: "SET_FORM_FIELDS";
  fields: FormFieldConfig[];
}
interface UpdateFormFieldAction {
  type: "UPDATE_FORM_FIELD";
  fieldId: string; // ID поля для обновления
  newConfig: Partial<FormFieldConfig>; // Только изменяемые свойства
}

interface UpdateFormFieldErrorAction {
  type: "UPDATE_FORM_FIELD_ERROR";
  fieldId: string;
  errorText: string | null;
}

type Action = SetTextAction | SetFormFieldsAction | UpdateFormFieldAction | UpdateFormFieldErrorAction;

const reducer = (state: StoreState, action: Action): StoreState => {
  const newState = deepCopy(state);

  switch (action.type) {
    case "SET_TEXT":
      newState.PageTitle = action.PageTitle;
      break;

    case "SET_FORM_FIELDS":
      newState.RegistrationPageSettings = action.fields;
      break;

    case "UPDATE_FORM_FIELD":
      console.log("tut");
      if (newState.RegistrationPageSettings) {
        newState.RegistrationPageSettings = newState.RegistrationPageSettings.map((field) =>
          field.inputId === action.fieldId ? { ...field, ...action.newConfig } : field,
        );
      }
      break;
    case "UPDATE_FORM_FIELD_ERROR":
      // debugger;
      if (newState.RegistrationPageSettings) {
        newState.RegistrationPageSettings = newState.RegistrationPageSettings.map((field) =>
          field.inputId === action.fieldId ? { ...field, errorText: action.errorText } : field,
        );
      }
      break;

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
      // debugger;
      currentState = reducer(currentState, action);
      subscribers.forEach((fn) => fn(currentState));
    },
  };
};

const initialState: StoreState = {
  PageTitle: "Initial state text",
  // LoginPageSettings:
  RegistrationPageSettings: registrationFormFieldsConfig,
};

function deepCopy<T>(object: T, seen = new WeakMap()): T {
  // Примитивные значения и null возвращаются без изменений
  if (object === null || typeof object !== "object") {
    return object;
  }

  // Если объект уже был скопирован, возвращаем его из WeakMap
  if (seen.has(object)) {
    return seen.get(object);
  }

  // Копируем Date
  if (object instanceof Date) {
    return new Date(object.getTime()) as T;
  }

  // Копируем массивы
  if (Array.isArray(object)) {
    const copy: any[] = [];
    seen.set(object, copy); // Запоминаем в WeakMap для циклических объектов
    for (const item of object) {
      copy.push(deepCopy(item, seen));
    }
    return copy as T;
  }

  // Копируем Map
  if (object instanceof Map) {
    const copy = new Map();
    seen.set(object, copy); // Запоминаем в WeakMap
    for (const [key, value] of object.entries()) {
      copy.set(deepCopy(key, seen), deepCopy(value, seen));
    }
    return copy as T;
  }

  // Копируем Set
  if (object instanceof Set) {
    const copy = new Set();
    seen.set(object, copy); // Запоминаем в WeakMap
    for (const item of object) {
      copy.add(deepCopy(item, seen));
    }
    return copy as T;
  }

  // Копируем обычные объекты
  const copy: { [key: string]: any } = {};
  seen.set(object, copy); // Запоминаем в WeakMap

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      copy[key] = deepCopy((object as { [key: string]: any })[key], seen);
    }
  }

  return copy as T;
}
const store = createStore(reducer, initialState);

export default store;
