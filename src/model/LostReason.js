function getLostReasonsFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  var id = fields
    .newDimension()
    .setId("id")
    .setName("Identifier")
    .setGroup("Lost Reasons")
    .setType(types.NUMBER);
  var accountId = fields
    .newDimension()
    .setId("account_id")
    .setName("Account ID")
    .setGroup("Lost Reasons")
    .setType(types.NUMBER);
  var name = fields
    .newDimension()
    .setId("name")
    .setName("Name")
    .setGroup("Lost Reasons")
    .setType(types.TEXT);
  var status = fields
    .newDimension()
    .setId("status")
    .setName("Status")
    .setGroup("Lost Reasons")
    .setType(types.BOOLEAN);

  fields.setDefaultDimension(name.getId());
  return fields;
}
