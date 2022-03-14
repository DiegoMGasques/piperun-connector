function getDealsFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  var title = fields
    .newDimension()
    .setId("title")
    .setName("Title")
    .setGroup("Deals Fact Table")
    .setType(types.TEXT);
  var description = fields
    .newDimension()
    .setId("description")
    .setName("Description")
    .setGroup("Deals Fact Table")
    .setType(types.TEXT);
  var observation = fields
    .newDimension()
    .setId("observation")
    .setName("Observation")
    .setGroup("Deals Fact Table")
    .setType(types.TEXT);
  var reference = fields
    .newDimension()
    .setId("reference")
    .setName("Reference")
    .setGroup("Deals Fact Table")
    .setType(types.TEXT);
  var rdStationReference = fields
    .newDimension()
    .setId("rdstation_reference")
    .setName("RD Station Reference")
    .setGroup("Deals Fact Table")
    .setType(types.TEXT);
  var reasonClose = fields
    .newDimension()
    .setId("reason_close")
    .setName("Reason Close")
    .setGroup("Deals Fact Table")
    .setType(types.TEXT);
  var deleted = fields
    .newDimension()
    .setId("deleted")
    .setName("Deleted")
    .setGroup("Deals Fact Table")
    .setType(types.BOOLEAN);
  var freezed = fields
    .newDimension()
    .setId("freezed")
    .setName("Freezed")
    .setGroup("Deals Fact Table")
    .setType(types.BOOLEAN);
  var probability = fields
    .newDimension()
    .setId("probability")
    .setName("Probability")
    .setGroup("Deals Fact Table")
    .setType(types.PERCENT);
  var order = fields
    .newDimension()
    .setId("order")
    .setName("Order")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var frozenAT = fields
    .newDimension()
    .setId("frozen_at")
    .setName("Frozen At")
    .setGroup("Deals Fact Table")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var createdAt = fields
    .newDimension()
    .setId("created_at")
    .setName("Created At")
    .setGroup("Deals Fact Table")
    .setType(types.YEAR_MONTH_DAY);
  var closedAt = fields
    .newDimension()
    .setId("closed_at")
    .setName("Closed At")
    .setGroup("Deals Fact Table")
    .setType(types.YEAR_MONTH_DAY);
  var updatedAt = fields
    .newDimension()
    .setId("updated_at")
    .setName("Updated At")
    .setGroup("Deals Fact Table")
    .setType(types.YEAR_MONTH_DAY);
  var lastStageUpdatedAt = fields
    .newDimension()
    .setId("last_stage_updated_at")
    .setName("Last Stage Updated At")
    .setGroup("Deals Fact Table")
    .setType(types.YEAR_MONTH_DAY);
  var probablyClosedAt = fields
    .newDimension()
    .setId("probably_closed_at")
    .setName("Probably Closed At")
    .setGroup("Deals Fact Table")
    .setType(types.YEAR_MONTH_DAY);
  var lastContactAt = fields
    .newDimension()
    .setId("last_contact_at")
    .setName("Last Contact At")
    .setGroup("Deals Fact Table")
    .setType(types.YEAR_MONTH_DAY);
  var stageChangedAt = fields
    .newDimension()
    .setId("stage_changed_at")
    .setName("Stage Changed At")
    .setGroup("Deals Fact Table")
    .setType(types.YEAR_MONTH_DAY);
  var originId = fields
    .newDimension()
    .setId("origin_id")
    .setName("Origin ID")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var companyId = fields
    .newDimension()
    .setId("company_id")
    .setName("Company ID")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var pipelineId = fields
    .newDimension()
    .setId("pipeline_id")
    .setName("Pipeline ID")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var stageId = fields
    .newDimension()
    .setId("stage_id")
    .setName("Stage ID")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var lostReasonId = fields
    .newDimension()
    .setId("lost_reason_id")
    .setName("Lost Reason ID")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var cityId = fields
    .newDimension()
    .setId("city_id")
    .setName("City ID")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var personId = fields
    .newDimension()
    .setId("person_id")
    .setName("Person ID")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var hash = fields
    .newDimension()
    .setId("hash")
    .setName("Hash")
    .setGroup("Deals Fact Table")
    .setType(types.TEXT);

  var typeReference = fields
    .newMetric()
    .setId("type_reference")
    .setName("Type Reference")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var temperature = fields
    .newMetric()
    .setId("temperature")
    .setName("Temperature")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var status = fields
    .newMetric()
    .setId("status")
    .setName("Status")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var value = fields
    .newMetric()
    .setId("value")
    .setName("Value")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);
  var valueMRR = fields
    .newMetric()
    .setId("value_mrr")
    .setName("Value MRR")
    .setGroup("Deals Fact Table")
    .setType(types.NUMBER);

  fields.setDefaultMetric(value.getId());
  fields.setDefaultDimension(title.getId());

  return fields;
}
