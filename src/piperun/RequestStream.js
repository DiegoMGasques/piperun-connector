function PiperunRequestStream(dataSource) {
  this.source = dataSource;
  console.log(this.source);
  this.pipeline = (x) => Either.of(x);
}
// ----- Functor Stream
PiperunRequestStream.prototype.map = function(fn) {
  this.pipeline = compose(map.bind(null, fn), this.pipeline);
  return this;
};

PiperunRequestStream.prototype.filter = function(fn) {
  this.pipeline = compose(filter.bind(null, fn), this.pipeline);
  return this;
};

PiperunRequestStream.prototype.run = function(data, cb) {
  for (var i = 0; i < data.length; i++) {
    const m = this.pipeline(data[i]);
    if (!m.isRight()) {
      cb(m.$value);
    }
  }
};

PiperunRequestStream.prototype.subscribe = function(cb) {
  console.log(this.source);
  if (typeof this.source.length === "number") {
    console.log("Cache data passed: ");
    this.run(this.source, cb);
  } else {
    var queue = null;
    do {
      var res = this.source.makeBatchRequest(queue);
      this.run(res.data, cb);
      queue = res.queue;
      console.log("Queue: " + queue.length);
    } while (queue.length > 0);
  }
};
