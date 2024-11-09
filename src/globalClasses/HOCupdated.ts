import Block, { BlockProps } from "./Block";
import { isEqual } from "../utils";
import store, { StoreEvents } from "./StoreUpdated";

export function connect<P extends BlockProps>(mapStateToProps: (state: Record<string, any>) => Partial<P>) {
  return function (Component: typeof Block<P>) {
    return class extends Component {
      private state: Partial<P>;

      constructor(props: P) {
        const state = mapStateToProps(store.getState());
        super({ ...props, ...state });

        this.state = state;

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(this.state, newState)) {
            this.setProps(newState);
          }

          this.state = newState;
        });
      }
    };
  };
}
