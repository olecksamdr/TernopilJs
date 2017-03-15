function map(func, array) {
  let result = new Array(array.length);

  function iterate(i) {
    if (i === array.length)
      return

    result[i] = func(array[i], i, array);
    iterate(++i);
  }

  iterate(0);

  return result;
}

var inputArray = [1, 2, 3, 4, 5];
var outputArray = [1, 3, 5, 7, 9];

deepFreeze(inputArray);

var callback = function (element, index) {
  return element + index;
};

var result = map(callback, inputArray);

expect(result).toEqual(outputArray);

console.log('Test successful!');
