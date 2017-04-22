function arrayMap(arr, fn, thisArg) {
  return arr.reduce((prev, current, index, array) => {
     prev.push(fn.call(thisArg, current, index, array));
     return prev;
  }, []);
}

module.exports = arrayMap;
