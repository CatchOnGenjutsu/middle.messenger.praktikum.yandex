interface Block {
  getContent(): HTMLElement;
  hide(): void;
  show(): void;
}

interface RouteProps {
  rootQuery: string;
}

class Route {
  private _pathname: string;
  private _blockClass: new (...args: any[]) => Block;
  private _block: Block | null = null;
  private _props: RouteProps;

  constructor(pathname: string, view: new (...args: any[]) => Block, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    this._block?.hide();
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
    } else {
      this._block.show();
    }
  }
}

export default class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: new (...args: any[]) => Block): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      const pathname = (event.currentTarget as Window)?.location.pathname || "/";
      this._onRoute(pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) return;

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

function render(query: string, block: Block): void {
  const root = document.getElementById(query);
  root?.replaceChildren(block.getContent());
}
