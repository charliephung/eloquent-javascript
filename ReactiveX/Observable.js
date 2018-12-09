function Observable(subscribe) {
  this._subscribe = subscribe;
}
Observable.fromEvent = function(dom, eventName) {
  return new Observable(function subscribe({ onNext, onError, onCompleted }) {
    var handler = e => onNext(e);
    dom.addEventListener(eventName, handler);
    return {
      dispose: () => dom.removeEventListener(eventName, handler)
    };
  });
};
Observable.prototype = {
  subscribe(onNext, onError = function() {}, onCompleted = function() {}) {
    if (typeof onNext == "function")
      return this._subscribe({
        onNext,
        onError,
        onCompleted
      });
    else {
      return this._subscribe(onNext);
    }
  },
  map(applyFn) {
    return new Observable(({ onNext, onError, onCompleted }) => {
      this.subscribe({
        onNext: x => onNext(applyFn(x)),
        onError,
        onCompleted
      });
    });
  },
  filter(predicateFn) {
    return new Observable(({ onNext, onError, onCompleted }) => {
      this.subscribe({
        onNext: x => predicateFn(x) && onNext(x),
        onError,
        onCompleted
      });
    });
  }
};
