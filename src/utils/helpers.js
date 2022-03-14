// left :: a -> Either a b
var left = (a) => new Left(a);
// either :: (a -> c) -> (b -> c) -> Either a b -> c
var either = curry((f, g, e) => {
  if (e.isLeft) {
    return f(e.$value);
  }
  return g(e.$value);
});
// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry(fn) {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
}

// reduceRight :: (b -> a -> b) -> b -> [a] -> b
function reduceRight(callback, acc, arr) {
  var res = acc;
  for (var i = arr.length; i > 0; i--) {
    res = callback(res, arr[i], i);
  }
}

// compose :: ((a -> b), (b -> c),..., (y -> z)) -> a -> z
function compose(fn, pipe) {
  return function(arg) {
    return fn(pipe(arg));
  };
}

// map :: Functor f => (a -> b) -> f a -> f b
const map = function(fn, f) {
  f.map(fn);
};
// map :: Functor f => (a -> b) -> f a -> f b
const filter = function(fn, f) {
  f.filter(fn);
};
// prop :: String -> Object -> a
const prop = curry(function(p, obj) {
  obj[p];
});
