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
      var mapObserver = {
        onNext: x => onNext(applyFn(x)),
        onError,
        onCompleted
      };
      return this.subscribe(mapObserver);
    });
  },
  filter(predicateFn) {
    return new Observable(({ onNext, onError, onCompleted }) => {
      var filterObserver = {
        onNext: x => predicateFn(x) && onNext(x),
        onError,
        onCompleted
      };
      return this.subscribe(filterObserver);
    });
  },
  take(num) {
    return new Observable(({ onNext, onError, onCompleted }) => {
      var counter = 0;
      var subscriptionObj = this.subscribe({
        onNext: x => {
          onNext(x);
          counter++;
          if (counter == num) {
            subscriptionObj.dispose();
            onCompleted();
          }
        },
        onError,
        onCompleted
      });

      return subscriptionObj;
    });
  }
};
