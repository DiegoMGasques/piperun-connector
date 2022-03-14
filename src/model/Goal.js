function getGoalsFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  var id = fields
    .newDimension()
    .setId("id")
    .setName("Identifier")
    .setGroup("Goals")
    .setType(types.NUMBER);
  var accountId = fields
    .newDimension()
    .setId("account_id")
    .setName("Account ID")
    .setGroup("Goals")
    .setType(types.NUMBER);
  var entityAttributeId = fields
    .newDimension()
    .setId("entity_attribute_id")
    .setName("Entity Attribute ID")
    .setGroup("Goals")
    .setType(types.NUMBER);
  var pipelineId = fields
    .newDimension()
    .setId("pipeline_id")
    .setName("Pipeline ID")
    .setGroup("Goals")
    .setType(types.NUMBER);
  var stageId = fields
    .newDimension()
    .setId("stage_id")
    .setName("Stage ID")
    .setGroup("Goals")
    .setType(types.NUMBER);
  var regionId = fields
    .newDimension()
    .setId("region_id")
    .setName("Region ID")
    .setGroup("Goals")
    .setType(types.NUMBER);
  var customFieldId = fields
    .newDimension()
    .setId("custom_field_id")
    .setName("Custom Field ID")
    .setGroup("Goals")
    .setType(types.NUMBER);
  var customFieldValue = fields
    .newDimension()
    .setId("custom_field_value")
    .setName("Custom Field Value")
    .setGroup("Goals")
    .setType(types.TEXT);
  var title = fields
    .newDimension()
    .setId("title")
    .setName("Title")
    .setGroup("Goals")
    .setType(types.TEXT);
  var observation = fields
    .newDimension()
    .setId("observation")
    .setName("Observation")
    .setGroup("Goals")
    .setType(types.TEXT);
  var status = fields
    .newDimension()
    .setId("status")
    .setName("Status")
    .setGroup("Goals")
    .setType(types.NUMBER);
  var startAt = fields
    .newDimension()
    .setId("start_at")
    .setName("Start At")
    .setGroup("Goals")
    .setType(types.YEAR_MONTH_DAY);
  var endAt = fields
    .newDimension()
    .setId("end_at")
    .setName("End At")
    .setGroup("Goals")
    .setType(types.YEAR_MONTH_DAY);
  var createdAt = fields
    .newDimension()
    .setId("created_at")
    .setName("Created At")
    .setGroup("Goals")
    .setType(types.YEAR_MONTH_DAY);
  var updatedAt = fields
    .newDimension()
    .setId("updated_at")
    .setName("Updated At")
    .setGroup("Goals")
    .setType(types.YEAR_MONTH_DAY);

  fields.setDefaultDimension(title.getId());
  return fields;
}
