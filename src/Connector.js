function Connector(token, cache) {
  var userProperties = PropertiesService.getUserProperties();
  this.cc = DataStudioApp.createCommunityConnector();
  this.token = userProperties.getProperty("dscc.key");
  this.cache = new DataCache(CacheService.getUserCache());
}

Connector.prototype.getAuth = function() {
  return this.cc
    .newAuthTypeResponse()
    .setAuthType(this.cc.AuthType.KEY)
    .setHelpUrl("https://crmpiperun.com/")
    .build();
};

Connector.prototype.isAuthValid = function() {};

Connector.prototype.getConfig = function(request) {};

Connector.prototype.getSchema = function(request) {};

Connector.prototype.getData = function(request) {
  var dateWindowCode = request.configParams.date_window;
  var startDate = getDateString(dateWindowCode);

  var piperunStream = new Piperun(this.token, this.cache)
    .updatedAt({
      start: startDate,
    })
    .deleted(false)
    .stream();

  var requestedFieldIds = request.fields.map(function(field) {
    return field.name;
  });
  var requestedFields = getFields(request.configParams.table).forIds(
    requestedFieldIds
  );

  var rows = [];
  function callback(data) {
    rows = rows.concat(data);
  }

  piperunStream.map(parseRowFor(requestedFields.asArray())).subscribe(callback);

  //var lock = LockService.getScriptLock();
  //lock.waitLock(120000); // lock 30 seconds

  //lock.releaseLock();
  return {
    schema: requestedFields.build(),
    rows: rows,
  };
};
