class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }
  /**
   * @public
   */
  subscribe(next, error = () => {}, complete = () => {}) {
    return typeof next == "function"
      ? this._subscribe({
          next,
          error,
          complete
        })
      : this._subscribe(next);
  }
  map(projection) {
    return new Observable(({ next, error, onComplete }) => {
      var mapObserver = {
        next: x => projection(next(x)),
        error,
        onComplete
      };
      var subscription = this.subscribe(mapObserver);
      return subscription;
    });
  }
  /**
   * @static
   */
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
