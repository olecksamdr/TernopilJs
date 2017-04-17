function reduce(arr, fn, initial) {
  function itterateArr(prev, current, index, array, f) {
    if (index === array.length - 1)
      return f(prev, current, index, array);

    prev = f(prev, current, index, array);
    current = array[++index];

    return itterateArr(prev, current, index, array, f);
  }

  return itterateArr(initial, arr[0], 0, arr, fn);
}

module.exports = reduce;
