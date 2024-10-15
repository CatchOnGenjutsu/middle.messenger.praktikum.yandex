import Block from "./Block";
import store from "./Store";

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block): HTMLElement | null {
  const root = document.getElementById(query);
  if (!root) {
    throw new Error(`Root element not found: ${query}`);
  }
  root.append(block.getContent());
  return root;
}

interface RouteProps {
  rootQuery: string;
}

class Route<T extends Block = Block> {
  private _pathname: string;
  private _blockClass: new (props?: unknown) => T;
  private _block: T | null = null;
  private _props: RouteProps;

  constructor(pathname: string, view: new () => T, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  public navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  public match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  public render(props?: unknown): void {
    if (!this._block) {
      this._block = new this._blockClass(props || {});
      render(this._props.rootQuery, this._block);
      return;
    }
    this._block.show();
  }
}

export default class Router<T extends Block = Block> {
  private static __instance: Router | null = null;
  private routes: Route<T>[] = [];
  private history: History = window.history;
  private _currentRoute: Route<T> | null = null;
  private _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance as Router<T>;
    }

    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  public use(pathname: string, block: new () => T): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  public start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      console.warn(`Route not found: ${pathname}`);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    const props = store.getState();
    route.render(props);
  }

  public go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  public back(): void {
    this.history.back();
  }

  public forward(): void {
    this.history.forward();
  }

  private getRoute(pathname: string): Route<T> | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}
