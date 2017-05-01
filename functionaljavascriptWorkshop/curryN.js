function curryN(fn, n) {
  n = n == null ? fn.length : n;

  return function () {
    console.log('N is:', n);

    let args = [].slice.call(arguments);

    if (args.length >= n)
      return fn.apply(null, args);

    fn = fn.bind(null, ...args);

    return curryN(fn, n - args.length);
  }
}

module.exports = curryN;
