function __Piperun__(token, cache) {
  this.endpoint = "deals";
  this.token = token;
  this.cache = cache;
  this.requestQueue = [];
  this.data = [];

  var options = {
    method: "GET",
    headers: {
      token: this.token,
      "Content-Type": "application/json",
    },
    muteHttpExceptions: true,
  };
  var url = this.url(1);
  console.log(url);
  var res = UrlFetchApp.fetch(url, options);
  var code = res.getResponseCode();
  console.log(JSON.stringify(res));

  if (res.getResponseCode() === 401) {
    throw new Error("UnauthorizedError: Cannot access resource.");
  }

  if (code !== 200) {
    throw new Error("RequestError: There was an error in the request.");
  }

  var data = JSON.parse(res.getContentText());

  this.endpointPagesCount = data.meta.total_pages;
  this.isTokenValid = true;

  return this;
}

__Piperun__.prototype.BASE_URL = "https://api.pipe.run/v1/";

__Piperun__.prototype.DEFAULT_START_DATE = "2021-01-01";

__Piperun__.prototype.BATCH_SIZE = 200;

__Piperun__.prototype.CUNCURRENT_REQUEST = 100;

__Piperun__.prototype.isTokenValid = function(token) {
  return true;
};

__Piperun__.prototype.url = function(page) {
  this.updatedAtStart = this.updatedAtStart || getDateString(1);
  this.updatedAtEnd = this.updatedAtEnd || getDateString();
  var start = this.updatedAtStart;
  var end = this.updatedAtEnd;
  var aggrQuery;
  if (this.endpoint === "deals") {
    aggrQuery =
      "&with=city,company,origin,pipeline,stage,owner,stageHistories.inStageName,stageHistories.inPipelineName,stageHistories.outStageName&updated_at_start=" +
      start +
      "&updated_at_end=" +
      end +
      "&deleted=0";
  } else {
    aggrQuery = "";
  }

  return (
    this.BASE_URL +
    this.endpoint +
    "?page=" +
    page +
    "&show=" +
    this.BATCH_SIZE +
    aggrQuery
  );
};

__Piperun__.prototype.for = function() {};

__Piperun__.prototype.updatedAt = function(range) {
  this.updatedAtStart = range.start || getDateString(1);
  this.updatedAtEnd = range.end || getDateString();
  return this;
};

__Piperun__.prototype.get = function() {
  throw new Error(
    "NotImplementedError: Method __Piperun__.get was not implemented."
  );
};

__Piperun__.prototype.getRequestQueue = function() {
  var requests = [];
  for (var i = 1; i <= this.endpointPagesCount; i++) {
    requests.push({
      url: this.url(i),
      method: "GET",
      headers: {
        token: this.token,
        "Content-Type": "application/json",
      },
      muteHttpExceptions: true,
    });
  }

  return requests;
};

__Piperun__.prototype.generateRequestQueue = function() {
  var requests = [];
  for (var i = 1; i <= this.endpointPagesCount; i++) {
    requests.push({
      url: this.url(i),
      method: "GET",
      headers: {
        token: this.token,
        "Content-Type": "application/json",
      },
      muteHttpExceptions: true,
    });
  }
  console.log("Generating requests: size " + requests.length);
  this.requestQueue = requests;
};

__Piperun__.prototype.getNextBatchOfRequests = function() {
  var nextBatch = this.requestQueue.splice(0, this.CUNCURRENT_REQUEST);
  console.log("Getting next batch: Size " + nextBatch.length);
  var left = Math.ceil(
    (this.endpointPagesCount - this.requestQueue.length) /
      this.CUNCURRENT_REQUEST
  );
  var total = Math.ceil(this.endpointPagesCount / this.CUNCURRENT_REQUEST);
  var batchNum = total - left;
  return { next: nextBatch, batchNum: batchNum };
};

__Piperun__.prototype.hasNext = function() {
  var hasNext = this.requestQueue.length > 0;
  console.log("Has next: " + hasNext);
  return hasNext;
};

__Piperun__.prototype.makeBatchRequests = function() {
  // TODO: Split into start() and next()

  // TODO: Extract into lastRequestTime()
  var userProperties = PropertiesService.getUserProperties();
  var timeLastRequest = userProperties.getProperty("request.last");
  console.log("Time last request: " + timeLastRequest);
  if (!timeLastRequest && timeLastRequest !== 0) {
    var date = new Date();
    var yesterday = date - 1000 * 60 * 60 * 24 * 2;
    timeLastRequest = yesterday;
  }
  console.log("Time last request: " + timeLastRequest);

  if (this.requestQueue.length === 0) {
    this.generateRequestQueue();
  }

  var nextBatch = this.getNextBatchOfRequests();

  // TODO: Calculate time exactly and avoid loop
  var now = Date.now();
  var ellapsedTime = now - timeLastRequest;
  console.log("Ellapsed time: " + ellapsedTime);
  while (ellapsedTime < 15500) {
    Utilities.sleep(1000);
    now = Date.now();
    ellapsedTime = now - timeLastRequest;
    console.log("Ellapsed time: " + ellapsedTime);
  }

  var startTime = Date.now();
  userProperties.setProperty("request.last", startTime);
  var response = UrlFetchApp.fetchAll(nextBatch.next);
  var endTime = Date.now();
  var failed = 0;
  console.log("Response length: " + response.length);
  console.log(
    "Requests completed in " + (endTime - startTime) / 1000 + " seconds"
  );

  var data = response.reduce(function(acc, res, i) {
    var content = JSON.parse(res.getContentText());
    if (content && content.success) {
      console.log("Content request success: " + content.success);
      return acc.concat(content.data);
    } else {
      failed += 1;
      failedRequests.push(nextBatch[i]);
      console.log("Content request success: " + content.success);
      return acc;
    }
  }, []);

  this.data = this.data.concat(data);

  console.log("Data size: " + data.length);
  console.log("Feiled requests: " + failed);

  var hasNext = this.hasNext();
  if (!hasNext) {
    this.setInCache();
  }

  return { data: data, hasNext: hasNext };
};

__Piperun__.prototype.getFromCache = function() {
  var start = new Date().getTime();
  var data = null;
  console.log("Trying to fetch from __Piperun__ cache...");
  try {
    var dataString = this.cache.get(
      this.token + "_" + (this.updatedAtStart || this.DEFAULT_START_DATE)
    );
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

__Piperun__.prototype.setInCache = function() {
  console.log("Setting data to __Piperun__ cache...");
  try {
    this.cache.set(
      this.token + "_" + (this.updatedAtStart || this.DEFAULT_START_DATE),
      JSON.stringify(this.data)
    );
  } catch (e) {
    console.log("Error when storing in cache", e);
  }
};
