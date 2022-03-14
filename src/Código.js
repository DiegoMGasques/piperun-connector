/**
 * Mandatory function required by Google Data Studio that should
 * return the authentication method required by the connector
 * to authorize the third-party service.
 * @return {Object} AuthType
 */
function getAuthType() {
  var cc = DataStudioApp.createCommunityConnector();
  return cc
    .newAuthTypeResponse()
    .setAuthType(cc.AuthType.KEY)
    .setHelpUrl("https://crmpiperun.com/")
    .build();
}

/**
 * Mandatory function required by Google Data Studio that should
 * determine if the authentication for the third-party service is valid.
 * @return {Boolean}
 */
function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var key = userProperties.getProperty("dscc.key");
  return checkForValidKey(key);
}

/**
 * Mandatory function required by Google Data Studio that should
 * set the credentials after the user enters either their
 * credential information on the community connector configuration page.
 * @param {Object} request The set credentials request.
 * @return {object} An object with an errorCode.
 */
function setCredentials(request) {
  var key = request.key;
  var validKey = checkForValidKey(key);
  if (!validKey) {
    return {
      errorCode: "INVALID_CREDENTIALS",
    };
  }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty("dscc.key", key);
  return {
    errorCode: "NONE",
  };
}

/**
 * Mandatory function required by Google Data Studio that should
 * clear user credentials for the third-party service.
 * This function does not accept any arguments and
 * the response is empty.
 */
function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty("dscc.key");
}

/**
 * Checks if the Key/Token provided by the user is valid
 * @param {String} key
 * @return {Boolean}
 */
function checkForValidKey(key) {
  var client = new Piperun(key);
  console.log(client);
  return client.token !== undefined;
}

/**
 * Mandatory function required by Google Data Studio that should
 * return the user configurable options for the connector.
 * @param {Object} request
 * @return {Object} fields
 */
function getConfig(request) {
  var cc = DataStudioApp.createCommunityConnector();
  var configParams = request.configParams;
  var isFirstRequest = configParams === undefined;
  var config = cc.getConfig();
  if (isFirstRequest) {
    config.setIsSteppedConfig(true);
  }

  const deals = config
    .newOptionBuilder()
    .setLabel("Visão Geral")
    .setValue("deals");
  const stageHistories = config
    .newOptionBuilder()
    .setLabel("Movimentação de Oportunidades")
    .setValue("stageHistory");

  config
    .newSelectSingle()
    .setId("table")
    .setName("Choose a table to import")
    .setIsDynamic(true)
    .addOption(deals)
    .addOption(stageHistories);

  if (!isFirstRequest) {
    var dateWindow = config
      .newSelectSingle()
      .setId("date_window")
      .setName("Periodo de analise");

    dateWindow.addOption(
      config
        .newOptionBuilder()
        .setLabel("Ultimos 7 dias")
        .setValue(0)
    );
    dateWindow.addOption(
      config
        .newOptionBuilder()
        .setLabel("Ultimos 30 dias")
        .setValue(1)
    );
    dateWindow.addOption(
      config
        .newOptionBuilder()
        .setLabel("Ultimos 90 dias")
        .setValue(2)
    );
    dateWindow.addOption(
      config
        .newOptionBuilder()
        .setLabel("Ultimos 180 dias")
        .setValue(3)
    );
    dateWindow.addOption(
      config
        .newOptionBuilder()
        .setLabel("Ultimos 365 dias")
        .setValue(4)
    );
    // dateWindow.addOption(
    //   config
    //     .newOptionBuilder()
    //     .setLabel("Marketing")
    //     .setValue(4)
    // );
    // dateWindow.addOption(
    //   config
    //     .newOptionBuilder()
    //     .setLabel("Contratos")
    //     .setValue(5)
    // );
    // dateWindow.addOption(
    //   config
    //     .newOptionBuilder()
    //     .setLabel("Projetos")
    //     .setValue(6)
    // );
    // dateWindow.addOption(
    //   config
    //     .newOptionBuilder()
    //     .setLabel("Administrativos")
    //     .setValue(7)
    // );
  }

  config.setDateRangeRequired(false);

  return config.build();
}

/**
 * Mandatory function required by Google Data Studio that should
 * return the schema for the given request.
 * This provides the information about how the connector's data is organized.
 * @param {Object} request
 * @return {Object} fields
 */
function getSchema(request) {
  var fields = getFields(request).build();
  return { schema: fields };
}

// function getStageHistoryRows(requestedFields, data) {
//   var reqFieldsArr = requestedFields.asArray();
//   var rows = data.reduce(function(acc, record) {
//     var curRows = record.stageHistories.map(function(hist, i) {
//       var row = [];
//       reqFieldsArr.forEach(function(field) {
//         if (field.getId() === "status") {
//           var status = parseInt(record.status);

//           switch (status) {
//             case 0:
//               return row.push("aberta");
//             case 1:
//               return row.push("fechada");
//             case 2:
//               return row.push("cancelada");
//             case 3:
//               return row.push("perdida");
//             default:
//               return row.push(null);
//           }
//         } else {
//           switch (field.getId()) {
//             case "stageHistories.id":
//               return row.push(hist.id || null);
//             case "stageHistories.account_id":
//               return row.push(hist.account_id || null);
//             case "stageHistories.deal_id":
//               return row.push(hist.deal_id || null);
//             case "stageHistories.in_stage_id":
//               return row.push(hist.in_stage_id || null);
//             case "stageHistories.out_stage_id":
//               return row.push(hist.out_stage_id || null);
//             case "stageHistories.in_user_id":
//               return row.push(hist.in_user_id || null);
//             case "stageHistories.out_user_id":
//               return row.push(hist.out_user_id || null);
//             case "stageHistories.in_date":
//               return row.push(formatDateResponse(hist.in_date));
//             case "stageHistories.out_date":
//               return row.push(formatDateResponse(hist.out_date));
//             case "stageHistories.inStageName":
//               return row.push(hist.inStageName || null);
//             case "stageHistories.outStageName":
//               return row.push(hist.outStageName || null);
//             case "stageHistories.inPipelineName":
//               return row.push(hist.inPipelineName || null);
//             case "stageHistories.lead_time":
//               return row.push(hist.lead_time || null);
//             case "owner.inUserName":
//               return row.push(record.owner ? record.owner.name : null);
//             case "owner.outUserName":
//               return row.push(record.owner ? record.owner.name : null);
//             case "created_at":
//               return row.push(formatDateResponse(record.created_at));
//             case "freezed":
//               return row.push(Boolean(record.freezed));
//             case "closed_at":
//               return row.push(formatDateResponse(record.closed_at));
//             case "value_mrr":
//               return row.push(Number(record.value_mrr));
//             case "value":
//               return row.push(Number(record.value));
//             case "origin.name":
//               var a = record.origin && record.origin.name;
//               return row.push(a || null);
//           }
//         }
//       });
//       return { values: row };
//     });
//     return acc.concat(curRows);
//   }, []);

//   return rows;
// }

// function getRows(requestedFields, data) {
//   var start = new Date().getTime();
//   var types = DataStudioApp.createCommunityConnector().FieldType;
//   var BOOLEAN = types.BOOLEAN.name();
//   var YEAR_MONTH_DAY = types.YEAR_MONTH_DAY.name();
//   var YEAR_MONTH_DAY_SECOND = types.YEAR_MONTH_DAY_SECOND.name();
//   var NUMBER = types.NUMBER.name();
//   var CURRENCY_BRL = types.CURRENCY_BRL.name();
//   var TEXT = types.TEXT.name();
//   var PERCENT = types.PERCENT.name();
//   var reqFieldsArr = requestedFields.asArray();

//   var rows = data.map(function(record, i) {
//     var s = new Date().getTime();
//     var row = [];

//     reqFieldsArr.forEach(function(field, j) {
//       if (i < 1) {
//         console.log("Requested field id: " + field.getId());
//         console.log("Requested field name: " + field.getName());
//         console.log("Requested field type: " + typeof field.getType().name());
//       }
//       var id = field.getId().split(".");
//       var depth = id.length;
//       var fieldType = field.getType().name();
//       var fieldData = record;

//       for (var i = 0; i < depth; i++) {
//         fieldData = fieldData[id[i]];
//         if (!fieldData) break;
//       }

//       if (id.length === 1 && id[0] === "status") {
//         switch (parseInt(fieldData)) {
//           case 0:
//             return row.push("aberta");
//           case 1:
//             return row.push("fechada");
//           case 2:
//             return row.push("cancelada");
//           case 3:
//             return row.push("perdida");
//           default:
//             return row.push(null);
//         }
//       }

//       switch (fieldType) {
//         case TEXT:
//           return row.push(fieldData ? String(fieldData) : null);
//         case BOOLEAN:
//           return row.push(Boolean(fieldData));
//         case YEAR_MONTH_DAY:
//         case YEAR_MONTH_DAY_SECOND:
//           return row.push(formatDateResponse(fieldData));
//         case CURRENCY_BRL:
//           return row.push(parseFloat(fieldData));
//         case PERCENT:
//           return row.push(fieldData ? fieldData / 100 : null);
//         case NUMBER:
//         default:
//           return row.push(fieldData ? fieldData : null);
//       }
//     });

//     if (i < 5) {
//       var e = new Date().getTime();
//       var et = e - s;
//       console.log("One row execution time: " + et);
//     }

//     return { values: row };
//   });

//   var end = new Date().getTime();
//   var executionTime = end - start;
//   console.log("Get rows took " + executionTime + " milliseconds");

//   return rows;
// }

function getData(request) {
  var userProperties = PropertiesService.getUserProperties();
  var token = userProperties.getProperty("dscc.key");
  var cache = new DataCache(CacheService.getUserCache());
  var dateWindowCode = request.configParams.date_window;
  var startDate = getDateString(dateWindowCode);
  var aggregations = [
    "city",
    "company",
    "origin",
    "pipeline",
    "stage",
    "owner",
    "stageHistories.inStageName",
    "stageHistories.inPipelineName",
    "stageHistories.outStageName",
  ];

  var piperunStream = new Piperun(token, cache)
    .updatedAt({
      start: startDate,
    })
    .deleted(false)
    .with(aggregations)
    .show(200)
    .stream();

  var requestedFieldsIds = request.fields.map(function(field) {
    return field.name;
  });
  var requestedFields = getFields(request.configParams.table).forIds(
    requestedFieldsIds
  );

  var rows = [];
  function callback(data) {
    rows = rows.concat(data);
  }

  piperunStream
    .map(parseRowFor.bind(null, [requestedFields.asArray()]))
    .subscribe(callback);

  //var lock = LockService.getScriptLock();
  //lock.waitLock(120000); // lock 30 seconds
  //lock.releaseLock();
  return {
    schema: requestedFields.build(),
    rows: rows,
  };
}

/**
 * Supports the getSchema() function
 * @param {Object} request
 * @return {Object} fields
 */
function getFields(table) {
  switch (table) {
    case "stageHistory":
      return getStageHistoryFields();
    case "deals":
    default:
      return getDealAggregatedFields();
  }
}

var parseRowFor = function(fields, record) {
  console.log(fields[0]);
  var rows = [];
  var numOfRows = getNumOfRows(record, fields);
  var id;
  var parsedId;

  for (var i = 0; i < numOfRows; i++) {
    var row = [];
    for (var i = 0; j < fields.length; j++) {
      id = fields[j].getId().replace("[i]", "." + i);
      parsedId = id.split(".");
      row.push(getValue(record, parsedId));
    }

    rows.push({ values: row });
  }
};

var getNumOfRows = function(record, fields) {
  console.log("Fields length: " + fields.length);
  console.log("Field id: " + fields[0].getId());
  for (var i = 0; i < fields.length; i++) {
    id = fields[i].getId().split("[i]");
    if (id.length > 1) {
      return record[id[0]].length;
    }
    return 1;
  }
};

var getValue = function(record, parsedId) {
  var value = record;
  for (var i = 0; i < parsedId.length; i++) {
    value = value[parsedId[i]];
  }

  if (parsedId[-1] === "status") {
    switch (value) {
      case 0:
        return "aberta";
      case 1:
        return "fechada";
      case 2:
        return "cancelada";
      case 3:
        return "perdida";
      default:
        return null;
    }
  }

  return isDateString(value) ? formatDateResponse(value) : value;
};

function __getData__(request) {
  var start = new Date().getTime();

  var requestedFieldIds = request.fields.map(function(field) {
    console.log("Field: ", JSON.stringify(field));
    return field.name;
  });
  var requestedFields = getFields(request).forIds(requestedFieldIds);

  var dateWindowCode = request.configParams.date_window;
  var startDate = getDateString(dateWindowCode);

  var path = request.configParams.path;
  var cache = new DataCache(CacheService.getUserCache());
  //var client = new PiperunClient(cache, path, startDate, endDate);
  // var data = client.endpoint("deals").addQuery({ update_at_start: '2020-09-31'}).request();
  // var valid = client.isTokenValid();
  //var data = client.start();

  var userProperties = PropertiesService.getUserProperties();
  var token = userProperties.getProperty("dscc.key");
  var piperunClient = new Piperun(token, cache).updatedAt({ start: startDate });
  var rows = [];
  var res;
  var data;

  //var lock = LockService.getScriptLock();
  //lock.waitLock(120000); // lock 30 seconds
  var cachePrefix =
    JSON.stringify(requestedFieldIds) + "_" + path + "_" + startDate;
  var cacheData; //= fetchFromCache(cache, cachePrefix);
  if (!cacheData) {
    data = piperunClient.getFromCache();
    if (data) {
      if (path === "stageHistories") {
        rows = getStageHistoryRows(requestedFields, data);
      } else {
        rows = getRows(requestedFields, data);
      }
    } else {
      do {
        res = piperunClient.makeBatchRequests();
        if (path === "stageHistories") {
          rows = rows.concat(getStageHistoryRows(requestedFields, res.data));
        } else {
          rows = rows.concat(getRows(requestedFields, res.data));
        }
      } while (res.hasNext);
    }

    setInCache(cache, cachePrefix, rows);
  } else {
    rows = cacheData;
  }

  console.log("Rows: " + JSON.stringify(rows[0]));
  //lock.releaseLock();

  var end = new Date().getTime();
  var executionTime = end - start;
  console.log(
    "Get data total execution time: " + executionTime + " milliseconds"
  );
  return {
    schema: requestedFields.build(),
    rows: rows,
  };
}

// function fetchFromAPI(endpoint) {
//   var start = new Date().getTime();
//   var userProperties = PropertiesService.getUserProperties();
//   var token = userProperties.getProperty("dscc.key");
//   var options = {
//     method: "GET",
//     headers: {
//       token: token,
//       "Content-Type": "application/json",
//     },
//     muteHttpExceptions: true,
//   };

//   // ?updated_at_start=aaaa-mm-dd&updated_at_end=aaaa-mm-dd
//   var path = endpoint === "subGoals" ? "goals" : endpoint;
//   var pagination;
//   var startDate = "2019-01-01";
//   var endDate = "2020-08-23";
//   if (path === "deals") {
//     pagination =
//       "?page=1&show=200&updated_at_start=" +
//       startDate +
//       "&updated_at_end=" +
//       endDate;
//   } else {
//     pagination = "?page=1&show=200";
//   }
//   var baseUrl = "https://api.pipe.run/v1/";
//   var url = baseUrl + path + pagination;
//   var data = [];

//   do {
//     console.log("Fetching", url, options.headers);
//     var result = UrlFetchApp.fetch(url, options);
//     if (result && result.getResponseCode() == 200) {
//       var parsedResult = JSON.parse(result);
//       var resData;
//       for (var i = 0; i < parsedResult.data.length; i++) {
//         resData = parsedResult.data[i];
//         if (endpoint === "subGoals") {
//           for (var j = 0; j < resData.subGoals.length; j++) {
//             data.push(resData.subGoals[j]);
//           }
//         } else {
//           data.push(resData);
//         }
//       }
//     } else {
//       DataStudioApp.createCommunityConnector()
//         .newUserError()
//         .setDebugText(
//           "Error fetching data from API. Exception details: " + response
//         )
//         .setText("Error fetching data from API. Exception details: " + response)
//         .throwException();
//     }

//     next = parsedResult.meta.links.next;

//     if (!!next) {
//       url = next;
//     } else {
//       console.log("No 'next' page. Done!");
//       break;
//     }
//   } while (!!next);

//   var end = new Date().getTime();
//   var executionTime = end - start;
//   console.log("Data length:", data.length);
//   console.log("Fetch from api took " + executionTime + " milliseconds");
//   return data;
// }

// function formatDateResponse(resDate) {
//   return resDate ? resDate.split(" ")[0].replace(/-/g, "") : resDate;
// }

// function fetchFromCache(cache, resource) {
//   var start = new Date().getTime();
//   var data = null;
//   console.log("Trying to fetch from cache...");
//   try {
//     var dataString = cache.get(resource);
//     console.log("Data string length: ", dataString.length);
//     data = JSON.parse(dataString);
//     console.log("Fetched succesfully from cache data length: ", data.length);
//   } catch (e) {
//     console.log("Error when fetching from cache:", e);
//   }
//   var end = new Date().getTime();
//   var executionTime = end - start;
//   console.log("Fetching from cache took " + executionTime + " milliseconds");
//   return data;
// }

// function setInCache(cache, resource, data) {
//   console.log("Setting data to cache...");
//   try {
//     cache.set(resource, JSON.stringify(data));
//   } catch (e) {
//     console.log("Error when storing in cache", e);
//   }
// }
