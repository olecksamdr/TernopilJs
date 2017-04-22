function Spy(target, method) {
  let base = target[method]

  target[method] = function () {
    let args = Array.prototype.slice.call(arguments);
    base.apply(target, args);

    arguments.callee.count++;
  }

  target[method].count = 0;

  return target[method];
}

module.exports = Spy;
