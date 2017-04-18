function duckCount() {
  return Array.prototype.slice.call(arguments)
              .reduce((prev, current) => {
                if (Object.prototype.hasOwnProperty.call(current, 'quack'))
                  return ++prev;
                return prev;
              }, 0);
}

module.exports = duckCount;
