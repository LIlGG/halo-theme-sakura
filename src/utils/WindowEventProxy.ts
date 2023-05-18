/**
 * WindowEventProxy
 * 
 * @description 代理 window 事件。使用节流处理事件，防止事件频繁触发
 */
export class WindowEventProxy {
  private static eventThrottles: Map<string, EventListener> = new Map();

  public static addEventListener(eventType: string, listener: EventListener, delay: number) {
    let throttle: EventListener | undefined;
    if (this.eventThrottles.has(eventType)) {
      throttle = this.eventThrottles.get(eventType);
    } else {
      throttle = WindowEventProxy.throttle(listener, delay);
      this.eventThrottles.set(eventType, throttle);
      window.addEventListener(eventType, throttle);
    }
  }

  public static removeEventListener(eventType: string, listener: EventListener) {
    if (this.eventThrottles.has(eventType)) {
      const throttle = this.eventThrottles.get(eventType);
      if (throttle !== undefined && throttle === listener) {
        this.eventThrottles.delete(eventType);
        window.removeEventListener(eventType, throttle);
      }
    }
  }

  public static throttle(fn: Function, delay: number) {
    let timer: number | null = null;
    return (...args: any[]) => {
      if (!timer) {
        timer = window.setTimeout(() => {
          fn.apply(this, args);
          timer = null;
        }, delay);
      }
    };
  }
}
