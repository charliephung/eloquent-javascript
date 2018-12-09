function Observable(subscribe) {
  this._subscribe = subscribe;

  this.fromEvent = function(dom, eventName) {
    return new Observable(function subscribe(observer) {
      var handler = e => observer.onNext(e);
      dom.addEventListener(eventName, handler);
      return {
        dispose: () => dom.removeEventListener(eventName, handler)
      };
    });
  };
}

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
  }
};
