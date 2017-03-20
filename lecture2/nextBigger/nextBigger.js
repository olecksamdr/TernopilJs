// Створіть функцію, яка приймає цілі числа і повертає наступне більше число,
// утворене за тими ж цифрами:
// ===========================================================================

function nextBigger(number) {
  let digits = toDigits(number);

  // приймає масив цифр і повертає число
  // [1, 2] => 12
  function makeNumber(digitsArr) {
      let
        last = digitsArr.length - 1,
        result = digitsArr[last],
        power = 0;

      for (let i = last - 1; i >= 0; i--) {
        power = last - i;
        result += digitsArr[i] * Math.pow(10, power);
      }

      return result;
  }

  // розбиває число на масив цифр
  function toDigits(num) {
    let arr = [];
    while (num > 0) {
        arr.unshift(num % 10);
        num = Math.floor(num / 10);
    }

    return arr;
  }


  let
    i = digits.length - 1,
    key = i,
    swaped = false;

  // беремо останню цифру (розряд одиниць), якщо попередня менша - міняємо місцями
  // якщо ні то йдемо далі поки не знайдемо меншу цифру або поки на пройдемо всі
  // цифри числа
  while (!swaped && i >= 0) {
    if (digits[key] > digits[i - 1]) {
      let save = digits[key];
      digits[key] = digits[i - 1];
      digits[i - 1] = save;

      // поміняли місцями, тоді всі цифри після позиції заміни сортуємо у порядку
      // зростання
      // 4165 => 4|5|61 => 4516
      let d2 = digits.splice(i).sort((a, b) => { return a - b; });
      digits = digits.concat(d2);

      swaped = true;
    }

    i--;
  }

  let final =  makeNumber(digits);

  // Коли результат не можливо отримати перестановкою
  // Наприклад коли на вхід ф-ція отримує 60, то в кінець просто добавляється
  // мінімальна цифра
  // 60 => 600
  if (final === number)
    return parseInt(final.toString() + Math.min.apply(Math, toDigits(number)));
  else
    return final;
}
