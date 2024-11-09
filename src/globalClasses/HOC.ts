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
      super({ ...(props as P) });

      store.subscribe(() => {
        this.setProps({
          ...store.getState(),
        });
      });
    }
  };
}
