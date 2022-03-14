function PiperunClient(cache, endpoint, startDate, endDate) {
  this.cache = cache;
  this.endpoint = endpoint;
  this.startDate = startDate;
  this.endDate = endDate;
  this.requireDateRange = {
    deals: true,
    persons: true,
    companies: true,
  };

  return this;
}

PiperunClient.prototype.BASE_URL = "https://api.pipe.run/v1/";

PiperunClient.prototype.DEFAULT_START_DATE = "2021-12-01";

PiperunClient.prototype.buildUrl = function() {
  var query = "?page=1&show=200";

  if (this.requireDateRange[this.endpoint]) {
    var startDate = this.startDate || this.DEFAULT_START_DATE;
    var endDate = this.endDate || getCurrentDate();
    query =
      query + "&updated_at_start=" + startDate + "&updated_at_end=" + endDate;
  }

  var url = this.BASE_URL + this.endpoint + query;
  console.log("URL built ", url);
  return url;
};

PiperunClient.prototype.buildOptions = function(m) {
  var userProperties = PropertiesService.getUserProperties();
  var token = userProperties.getProperty("dscc.key");
  var method = m || "GET";
  var options = {
    method: method,
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    muteHttpExceptions: true,
  };
  console.log("Options built!");
  return options;
};

PiperunClient.prototype.start = function() {
  var data = null;
  data = this.fetchFromCache();
  if (!data) {
    data = this.fetchFromAPI();
    this.setInCache(data);
  }
  return data;
};

PiperunClient.prototype.fetchFromAPI = function() {
  var start = new Date().getTime();

  var options = this.buildOptions("GET");
  var url = this.buildUrl();
  var data = [];
  do {
    console.log("Fetching", url, options.headers);
    var result = UrlFetchApp.fetch(url, options);
    if (result && result.getResponseCode() == 200) {
      var parsedResult = JSON.parse(result);
      data.push.apply(data, parsedResult.data);
    } else {
      DataStudioApp.createCommunityConnector()
        .newUserError()
        .setDebugText(
          "Error fetching data from API. Exception details: " + response
        )
        .setText("Error fetching data from API. Exception details: " + response)
        .throwException();
    }

    next = parsedResult.meta.links.next;

    if (!!next) {
      url = next;
    } else {
      console.log("No 'next' page. Done!");
      break;
    }
  } while (!!next);

  var end = new Date().getTime();
  var executionTime = end - start;
  console.log("Data length:", data.length);
  console.log("Fetch from api took " + executionTime + " milliseconds");

  return data;
};

PiperunClient.prototype.fetchFromCache = function() {
  var start = new Date().getTime();
  cachePrefix =
    this.endpoint + "_" + (this.startDate || this.DEFAULT_START_DATE);
  var data = null;
  console.log("Trying to fetch from cache...");
  try {
    var dataString = this.cache.get(cachePrefix);
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

PiperunClient.prototype.setInCache = function(data) {
  console.log("Setting data to cache...");
  try {
    cachePrefix =
      this.endpoint + "_" + (this.startDate || this.DEFAULT_START_DATE);
    this.cache.set(cachePrefix, JSON.stringify(data));
  } catch (e) {
    console.log("Error when storing in cache", e);
  }
};
