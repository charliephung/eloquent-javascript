function Observable(subscribe) {
  this._subscribe = subscribe;
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
