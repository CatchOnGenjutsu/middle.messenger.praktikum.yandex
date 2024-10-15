import store from "./Store";
import Block, { BlockProps } from "./Block"; // Импортируем Block и его интерфейсы

type ComponentConstructor<P extends BlockProps = {}> = new (props: P) => Block<P>;

export function connect<P extends BlockProps>(
  Component: ComponentConstructor<P>,
  noProps: boolean = false,
): ComponentConstructor<P> {
  return class ConnectedComponent extends Component {
    constructor(props?: P) {
      const initialProps = noProps ? ({} as P) : (props as P);
      super({ ...initialProps, ...store.getState() });

      store.subscribe(() => {
        console.log("We are in store subscription");
        const newState = store.getState();
        this.setProps(newState as unknown as Partial<P>);
      });

      console.log(this);
    }
  };
}
