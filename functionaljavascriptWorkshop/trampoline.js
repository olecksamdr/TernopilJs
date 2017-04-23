function repeat(operation, num) {
  return function() {
    if (num === 0) return;
    operation();
    return repeat(operation, --num);
  }
}

function trampoline(fn) {
  while(typeof fn === 'function') {
    fn = fn();
  }
}

module.exports = function trampoReapet(operation, num) {
  trampoline(repeat(operation, num));
}
