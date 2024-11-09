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
  private _params: Record<string, string> = {};

  constructor(pathname: string, view: new (...args: any[]) => Block, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  match(pathname: string): boolean {
    const routePattern = this._pathname.replace(/:([^/]+)/g, "(?<$1>[^/]+)");
    const regex = new RegExp(`^${routePattern}$`);
    const match = regex.exec(pathname);
    if (match) {
      this._params = match.groups || {};
      return true;
    }
    return false;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render(true);
    }
  }

  leave() {
    this._block?.hide();
  }

  render(force = false) {
    if (!this._block || force) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
    } else {
      this._block.show();
    }
  }

  getParams(): Record<string, string> {
    return this._params;
  }
}

export default class Router {
  private static instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string;
  private _middleware: ((pathname: string) => boolean)[] = [];
  private _notFoundPage: Route | null = null;

  private constructor(rootQuery: string) {
    this._rootQuery = rootQuery;
  }

  public static getInstance(rootQuery: string): Router {
    if (!Router.instance) {
      Router.instance = new Router(rootQuery);
    }
    return Router.instance;
  }

  use(pathname: string, block: new (...args: any[]) => Block): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  setNotFoundPage(block: new (...args: any[]) => Block): this {
    this._notFoundPage = new Route("*", block, { rootQuery: this._rootQuery });
    return this;
  }

  addMiddleware(middleware: (pathname: string) => boolean): this {
    this._middleware.push(middleware);
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
    if (!this._runMiddleware(pathname)) return;

    const route = this.getRoute(pathname);
    if (!route) {
      this._handleNotFound();
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(true);
  }

  private _runMiddleware(pathname: string): boolean {
    return this._middleware.every((fn) => fn(pathname));
  }

  private _handleNotFound() {
    if (this._notFoundPage) {
      if (this._currentRoute) this._currentRoute.leave();
      this._notFoundPage.render();
    } else {
      console.error("404: Page not found");
    }
  }

  go(pathname: string) {
    if (this._currentRoute?.match(pathname)) {
      this._onRoute(pathname);
    } else {
      this.history.pushState({}, "", pathname);
      this._onRoute(pathname);
    }
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
  if (!root) {
    throw new Error(`Root element with selector "${query}" not found`);
  }
  root.replaceChildren(block.getContent());
}
