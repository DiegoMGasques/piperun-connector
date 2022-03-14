function getStagesFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  var id = fields
    .newDimension()
    .setId("id")
    .setName("ID")
    .setGroup("Stages")
    .setType(types.NUMBER);
  var accountId = fields
    .newDimension()
    .setId("account_id")
    .setName("Account ID")
    .setGroup("Stages")
    .setType(types.NUMBER);
  var pipelineId = fields
    .newDimension()
    .setId("pipeline_id")
    .setName("Pipeline ID")
    .setGroup("Stages")
    .setType(types.NUMBER);
  var originId = fields
    .newDimension()
    .setId("origin_id")
    .setName("Origin ID")
    .setGroup("Stages")
    .setType(types.NUMBER);
  var name = fields
    .newDimension()
    .setId("name")
    .setName("Name")
    .setGroup("Stages")
    .setType(types.TEXT);
  var description = fields
    .newDimension()
    .setId("description")
    .setName("Description")
    .setGroup("Stages")
    .setType(types.TEXT);
  var completionPercentage = fields
    .newDimension()
    .setId("completion_percentage")
    .setName("Completion Percentage")
    .setGroup("Stages")
    .setType(types.PERCENT);
  var blockEmails = fields
    .newDimension()
    .setId("block_emails")
    .setName("Block Emails")
    .setGroup("Stages")
    .setType(types.NUMBER);
  var daysLimit = fields
    .newDimension()
    .setId("days_limit")
    .setName("Days Limit")
    .setGroup("Stages")
    .setType(types.NUMBER);
  var updateLimit = fields
    .newDimension()
    .setId("update_limit")
    .setName("Update Limit")
    .setGroup("Stages")
    .setType(types.NUMBER);
  var color = fields
    .newDimension()
    .setId("color")
    .setName("Color")
    .setGroup("Stages")
    .setType(types.TEXT);
  var hash = fields
    .newDimension()
    .setId("hash")
    .setName("Hash")
    .setGroup("Stages")
    .setType(types.TEXT);

  fields.setDefaultDimension(name.getId());

  return fields;
}
