// Створіть клас, який буде наслідувати об’єкт і матиме додаткові методи:
//
// simple properties creation
// constant properties creation
// hidden properties creation (not visible in for…in cycle)
// get array of all enumerable values
// ======================================================================


function MyObject() {}

MyObject.prototype.property = function (key, val) {
  this[key] = val;
}

MyObject.prototype.constant = function (key, val) {
  Object.defineProperty(this, key, {
    value: val,
    writable: false,
    configurable: false,
    enumerable: true
  });
}

MyObject.prototype.hidden = function (key, val) {
  Object.defineProperty(this, key, {
    value: val,
    writable: true,
    configurable: true,
    enumerable: false
  })
}

MyObject.prototype.values = function () {
  return Object.keys(this);
}
