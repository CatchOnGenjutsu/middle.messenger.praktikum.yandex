export type EventCallback = (...args: unknown[]) => void;

export default class EventBus {
  private listeners: Record<string, EventCallback[]>;

  constructor() {
    this.listeners = {};
  }

  public on(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  public off(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) return; // Убираем выброс ошибки

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  public emit(event: string, ...args: unknown[]): void {
    const eventListeners = this.listeners[event];
    if (!eventListeners || eventListeners.length === 0) return; // Ничего не делаем, если нет слушателей

    eventListeners.forEach((listener) => {
      listener(...args);
    });
  }
}
