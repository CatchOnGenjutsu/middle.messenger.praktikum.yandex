import EventBus, { EventCallback } from "./EventBus";
import Handlebars from "handlebars";

export interface BlockProps {
  [key: string]: unknown;
  events?: Record<string, EventListener>;
  attr?: Record<string, string>;
}

interface Children {
  [key: string]: Block<any>;
}

interface Lists {
  [key: string]: Block<any>[];
}

export default class Block<P extends BlockProps = {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  protected _element: HTMLElement | null = null;

  protected _id: number = Math.floor(100000 + Math.random() * 900000);

  props: P;

  children: Children;

  lists: Lists;

  protected eventBus: () => EventBus;

  constructor(propsWithChildren: P = {} as P) {
    const eventBus = new EventBus();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy<P>({ ...props } as P);
    this.children = children;
    // this.lists = lists;
    this.lists = this._makePropsProxy<Lists>({ ...lists });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events } = this.props;
    // console.log(this._element, events);
    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          this._element.addEventListener(eventName, events[eventName]);
        }
      });
    }
  }
  private _removeEvents(): void {
    const { events } = this.props;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          this._element.removeEventListener(eventName, events[eventName]);
        }
      });
    }
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback);
  }

  protected init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    // console.log(this, this._propsHaveChanged(oldProps, newProps));
    if (this._propsHaveChanged(oldProps, newProps)) {
      this._updateChildrenProps(this.children, newProps);
      if (Object.values(this.lists).length) {
        this._updateListsProps(this.lists, newProps);
      }
      this._render();
    }
  }

  private _propsHaveChanged(oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean {
    function deepCompare(obj1: unknown, obj2: unknown): boolean {
      if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
        return obj1 !== obj2;
      }

      const obj1Record = obj1 as Record<string, unknown>;
      const obj2Record = obj2 as Record<string, unknown>;

      const keys1 = Object.keys(obj1Record);
      const keys2 = Object.keys(obj2Record);

      if (keys1.length !== keys2.length) {
        return true;
      }

      for (const key of keys1) {
        if (!keys2.includes(key)) {
          return true;
        }

        if (deepCompare(obj1Record[key], obj2Record[key])) {
          return true;
        }
      }

      return false;
    }

    return deepCompare(oldProps, newProps);
  }

  private _updateChildrenProps(children: Record<string, unknown>, newProps: Record<string, unknown>): void {
    function deepUpdateProps(target: Record<string, unknown>, source: Record<string, unknown>): void {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (
            typeof source[key] === "object" &&
            source[key] !== null &&
            typeof target[key] === "object" &&
            target[key] !== null
          ) {
            deepUpdateProps(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
          } else {
            target[key] = source[key];
          }
        }
      }
    }

    for (const childName in children) {
      if (Object.prototype.hasOwnProperty.call(children, childName)) {
        const child = children[childName] as {
          props: Record<string, unknown>;
          setProps?: (props: Record<string, unknown>) => void;
        };
        if (child && typeof child.setProps === "function") {
          const childNewProps = (newProps[childName] || {}) as Record<string, unknown>;
          deepUpdateProps(child.props, childNewProps);
          child.setProps(child.props);
        }
      }
    }
  }

  private _updateListsProps(lists: Lists, newProps: Record<string, unknown>): void {
    function deepUpdateProps(target: Record<string, unknown>, source: Record<string, unknown>): void {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (
            typeof source[key] === "object" &&
            source[key] !== null &&
            typeof target[key] === "object" &&
            target[key] !== null
          ) {
            deepUpdateProps(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
          } else {
            target[key] = source[key];
          }
        }
      }
    }

    for (const listName in lists) {
      if (Object.prototype.hasOwnProperty.call(lists, listName)) {
        const list = lists[listName];

        list.forEach((item) => {
          if (item && typeof item.setProps === "function") {
            const listNewProps = (newProps[listName] || {}) as Record<string, unknown>;
            deepUpdateProps(item.props, listNewProps);
            item.setProps(item.props);
          }
        });
      }
    }
  }

  private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
    children: Children;
    props: BlockProps;
    lists: Lists;
  } {
    const children: Children = {};
    const props: BlockProps = {};
    const lists: Lists = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((item) => item instanceof Block)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  protected addAttributes(): void {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  public setProps = (nextProps: Partial<BlockProps>): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const propsAndStubs = { ...this.props };
    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      (propsAndStubs as Record<string, unknown>)[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      (propsAndStubs as Record<string, unknown>)[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement("template");
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub && stub.parentNode) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([, list]) => {
      const listCont = this._createDocumentElement("template");
      list.forEach((item) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  protected render(): string {
    return "";
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error("Element is not created");
    }
    return this._element;
  }

  // private _makePropsProxy(props: BlockProps): BlockProps {
  //   return new Proxy(props, {
  //     get: (target: BlockProps, prop: string) => {
  //       const value = target[prop];
  //       return typeof value === "function" ? value.bind(target) : value;
  //     },
  //     set: (target: BlockProps, prop: string, value: unknown) => {
  //       const oldTarget = { ...target };
  //       target[prop] = value;
  //       this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
  //       return true;
  //     },
  //     deleteProperty: () => {
  //       throw new Error("No access");
  //     },
  //   });
  // }

  private _makePropsProxy<T extends object>(props: T): T {
    return new Proxy(props, {
      get: (target: T, prop: string) => {
        const value = target[prop as keyof T];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: T, prop: string, value: unknown) => {
        const oldTarget = { ...target };
        (target as any)[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("No access");
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  public show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = "block";
    }
  }

  public hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = "none";
    }
  }
}
