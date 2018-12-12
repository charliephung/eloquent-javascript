class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }
  subscribe(next, error = () => {}, complete = () => {}) {
    return typeof next == "function"
      ? this._subscribe({
          next,
          error,
          complete
        })
      : this._subscribe(next);
  }

  static timeout(time) {
    return new Observable(({ next, error, onComplete }) => {
      var handler = setTimeout(() => {
        next();
        onComplete();
      }, time);

      return {
        unsubscribe: () => clearTimeout(handler)
      };
    });
  }
  static fromEvent(dom, eventName) {
    return new Observable(({ next, error, onComplete }) => {
      dom.addEventListener(eventName, next);
      return {
        unsubscribe: () => dom.removeEventListener(eventName, next)
      };
    });
  }
}
