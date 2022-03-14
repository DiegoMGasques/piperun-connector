function Either(x) {
  this.$value = x;
}

Either.of = function(x) {
  return new Right(x);
};

function Right(x) {
  Either.call(this, x);
}

Right.of = function(x) {
  throw new Error(
    "`of` called on class Right (value) instead of Either (type)"
  );
};

Right.prototype = Object.create(Either.prototype);
Right.prototype.contructor = Right;
Right.prototype.name = "Right";

Right.prototype.isLeft = function() {
  return false;
};
Right.prototype.isRight = function() {
  return true;
};
// ----- Functor (Either a)
Right.prototype.map = function(fn) {
  return Either.of(fn(this.$value));
};
// ----- Functor (Either a)
Right.prototype.filter = function(fn) {
  var bool = fn(this.$value);
  return bool ? this : left("Filter: " + (fn.name || fn.toString()));
};

function Left(x) {
  Either.call(this, x);
}

Left.of = function(x) {
  throw new Error("`of` called on class Left (value) instead of Either (type)");
};

Left.prototype = Object.create(Either.prototype);
Left.prototype.contructor = Left;
Left.prototype.name = "Left";

Left.prototype.isLeft = function() {
  return true;
};
Left.prototype.isLeft = function() {
  return false;
};
// ----- Functor (Either a)
Left.prototype.map = function(fn) {
  return this;
};
// ----- Functor (Either a)
Left.prototype.filter = function(fn) {
  return this;
};
