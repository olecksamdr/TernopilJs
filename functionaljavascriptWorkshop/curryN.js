// Мені не вдалося зробити це завдання самостійно
// https://gist.github.com/kevincennis/6db9923d797c5f30dc6e

function curryN( fn ) {
  var arity = fn.length;

  return (function resolver() {
    var mem = Array.prototype.slice.call( arguments );

    return function() {
      var args = mem.slice();
      Array.prototype.push.apply( args, arguments );
      return ( args.length >= arity ? fn : resolver ).apply( null, args );
    };
  }());
}

module.exports = curryN;
