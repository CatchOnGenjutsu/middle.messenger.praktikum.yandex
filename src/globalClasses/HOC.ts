import Block from "./Block";
import store from "./Store";
export interface StoreState {
  PageTitle: string;
}
type ComponentProps = Record<string, unknown>;

interface Component extends Block {
  setProps(nextProps: ComponentProps): void;
}

export function connect<P extends ComponentProps>(
  Component: new (props: P) => Component,
): new (props: Omit<P, keyof StoreState>) => Component {
  return class extends Component {
    constructor(props: Omit<P, keyof StoreState>) {
      // const combinedProps = { ...props, ...store.getState() } as unknown as P;
      super({ ...(props as P) });

      store.subscribe(() => {
        // const newStateProps = store.getState(); // Получаем новое состояние
        console.log("Store updated:", store.getState());

        this.setProps({
          ...store.getState(), // Передаём новые данные из Store
        });
        console.log("Component", this);
        console.log("Component props:", this.props);
      });
    }
  };
}
