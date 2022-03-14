function Piperun(token, cache) {
  console.log("Inside Piperun: " + token);
  this.cache = cache;
  this.url = new Url();
  this.request = new Request({});
  this.buffer = [];

  if (this.isTokenValid(token)) {
    this.token = token;
  } else {
    throw new InvalidTokenExceptions(token);
  }
}

Piperun.prototype.buildRequestOptions = function(token) {
  return {
    url: this.url.build(),
    method: "get",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    muteHttpExceptions: true,
  };
};

Piperun.prototype.isTokenValid = function(token) {
  // var options = this.buildRequestOptions(token);
  var options = {
    method: "get",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    muteHttpExceptions: true,
  };
  var res = this.request.get(this.url.build(), options);
  return res.success;
};

Piperun.prototype.updatedAt = function(range) {
  this.url.filter({
    updatedAtStart: range.start || getDateString(1),
    updatedAtEnd: range.end || getDateString(),
  });

  return this;
};

Piperun.prototype.deleted = function(deleted) {
  this.url.filter({
    deleted: deleted ? 1 : 0,
  });

  return this;
};

Piperun.prototype.for = function(path) {
  this.url.path(path);
  return this;
};

Piperun.prototype.show = function(dataSize) {
  this.url.show(dataSize);
  return this;
};

Piperun.prototype.with = function(aggreagations) {
  this.url.with(aggreagations);
  return this;
};

Piperun.prototype.generateRequestQueue = function() {
  var options = {
    method: "get",
    headers: {
      token: this.token,
      "Content-Type": "application/json",
    },
    muteHttpExceptions: true,
  };
  var url = this.url.build();
  var data = this.request.get(url, options);
  var pages = data.meta.total_pages;

  var requestQueue = [];
  for (var i = 1; i <= pages; i++) {
    this.url.page(i);
    requestQueue.push(this.buildRequestOptions(this.token));
  }

  return requestQueue;
};

Piperun.prototype.makeBatchRequest = function(queue) {
  var res = this.request.batch(queue || this.generateRequestQueue());
  this.buffer = this.buffer.concat(res.data);

  if (res.queue.length === 0) {
    this.setInCache();
  }

  return res;
};

Piperun.prototype.stream = function() {
  var cacheData = this.getFromCache();
  var source = cacheData || this;
  return new PiperunRequestStream(source);
};

Piperun.prototype.getFromCache = function() {
  var start = new Date().getTime();
  var data = null;
  console.log("Trying to fetch from Piperun cache...");
  try {
    var prefix =
      this.options.filter.updatedAtStart +
      "_" +
      this.options.path +
      "_" +
      this.token;
    var dataString = this.cache.get(prefix);
    console.log("Data string length: ", dataString.length);
    data = JSON.parse(dataString);
    console.log("Fetched succesfully from cache data length: ", data.length);
  } catch (e) {
    console.log("Error when fetching from cache:", e);
  }
  var end = new Date().getTime();
  var executionTime = end - start;
  console.log("Fetching from cache took " + executionTime + " milliseconds");
  return data;
};

Piperun.prototype.setInCache = function() {
  console.log("Setting data to Piperun cache...");
  var prefix =
    this.options.filter.updatedAtStart +
    "_" +
    this.options.path +
    "_" +
    this.token;
  try {
    this.cache.set(prefix, JSON.stringify(this.buffer));
  } catch (e) {
    console.log("Error when storing in cache", e);
  }
};

// FetchAllStream(req, batch)
//   .filter(checkResponse)
//   .map((res) => res.data)
//   .map(flatten)
//   .subscribe(gatherResult);

// client(token).updatedAt().with().getStream().map().filter().subscribe((chunck) => data.concat(chunck))
