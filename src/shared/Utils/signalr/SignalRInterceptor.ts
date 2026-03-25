/**
 * Система перехвата и мокирования SignalR сообщений
 * Позволяет:
 * - Перехватывать реальные события от хаба
 * - Генерировать мокированные события для тестирования/storybook
 * - Переключаться между реальным и mock режимами
 */

type EventListener<T = any> = (data: T) => Promise<void> | void;
type EventListenerMap = Record<string, EventListener[]>;

export interface ISignalRInterceptor {
  /** Переключить режим мокирования */
  setMockMode(enabled: boolean): void;

  /** Получить текущий режим мокирования */
  isMockMode(): boolean;

  /** Подписаться на событие */
  on<T = any>(eventName: string, listener: EventListener<T>): void;

  /** Отписаться от события */
  off<T = any>(eventName: string, listener: EventListener<T>): void;

  /** Эмитить событие (для мокирования) */
  emit<T = any>(eventName: string, data: T): Promise<void>;

  /** Получить список зарегистрированных событий */
  getRegisteredEvents(): string[];
}

/**
 * Реализация перехватчика SignalR сообщений
 */
export class SignalRInterceptor implements ISignalRInterceptor {
  private mockMode = false;
  private listeners: EventListenerMap = {};
  private originalOn: Map<string, any> = new Map();
  private hubName: string;

  constructor(hubName: string) {
    this.hubName = hubName;
  }

  setMockMode(enabled: boolean): void {
    this.mockMode = enabled;
  }

  isMockMode(): boolean {
    return this.mockMode;
  }

  on<T = any>(eventName: string, listener: EventListener<T>): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  off<T = any>(eventName: string, listener: EventListener<T>): void {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName] = this.listeners[eventName].filter(l => l !== listener);
  }

  async emit<T = any>(eventName: string, data: T): Promise<void> {
    if (!this.listeners[eventName]) return;

    const promises = this.listeners[eventName].map(listener =>
      Promise.resolve(listener(data))
    );

    await Promise.all(promises);
  }

  getRegisteredEvents(): string[] {
    return Object.keys(this.listeners);
  }
}

/**
 * Глобальный реестр перехватчиков для каждого хаба
 */
class SignalRInterceptorRegistry {
  private interceptors: Map<string, SignalRInterceptor> = new Map();

  register(hubName: string): SignalRInterceptor {
    if (!this.interceptors.has(hubName)) {
      this.interceptors.set(hubName, new SignalRInterceptor(hubName));
    }
    return this.interceptors.get(hubName)!;
  }

  get(hubName: string): SignalRInterceptor | undefined {
    return this.interceptors.get(hubName);
  }

  getAll(): Map<string, SignalRInterceptor> {
    return this.interceptors;
  }
}

export const signalRInterceptorRegistry = new SignalRInterceptorRegistry();
