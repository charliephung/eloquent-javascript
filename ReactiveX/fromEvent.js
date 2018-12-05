function fromEvent(dom, eventName) {
  return {
    forEach: function(obs) {
      var handeler = e => {
        obs.onNext(e);
      };
      dom.addEventListener(eventName, handeler);
      return {
        dispose: function(params) {
          dom.removeEventListener(eventName, handeler);
        }
      };
    }
  };
}

// Example
var body = document.getElementsByTagName("body")[0];

var mousemove = fromEvent(body, "mousemove");
mousemove.forEach({
  onNext: e => console.log(e)
});
