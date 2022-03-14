function getOriginsFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  var id = fields
    .newDimension()
    .setId("id")
    .setName("Identifier")
    .setGroup("Origins")
    .setType(types.NUMBER);
  var accountId = fields
    .newDimension()
    .setId("account_id")
    .setName("Account ID")
    .setGroup("Origins")
    .setType(types.NUMBER);
  var originGroupId = fields
    .newDimension()
    .setId("origin_group_id")
    .setName("Origin Group ID")
    .setGroup("Origins")
    .setType(types.NUMBER);
  var name = fields
    .newDimension()
    .setId("name")
    .setName("Name")
    .setGroup("Origins")
    .setType(types.TEXT);
  var description = fields
    .newDimension()
    .setId("description")
    .setName("Description")
    .setGroup("Origins")
    .setType(types.TEXT);
  var active = fields
    .newDimension()
    .setId("active")
    .setName("Active")
    .setGroup("Origins")
    .setType(types.BOOLEAN);

  fields.setDefaultDimension(name.getId());

  return fields;
}
