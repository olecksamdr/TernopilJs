function map(func, array) {
  let result = new Array(array.length);

  function iterate(i) {
    if (i === array.length)
      return;

    result[i] = func(array[i], i, array);
    iterate(++i);
  }

  iterate(0);

  return result;
}
