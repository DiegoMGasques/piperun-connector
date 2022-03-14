function getPipelinesFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  var id = fields
    .newDimension()
    .setId("id")
    .setName("Identifier")
    .setGroup("Pipelines")
    .setType(types.NUMBER);
  var accountId = fields
    .newDimension()
    .setId("account_id")
    .setName("Account ID")
    .setGroup("Pipelines")
    .setType(types.NUMBER);
  var funnelType = fields
    .newDimension()
    .setId("funnel_type")
    .setName("Funnel Type")
    .setGroup("Pipelines")
    .setType(types.NUMBER);
  var funnelTypeName = fields
    .newDimension()
    .setId("funnel_type_name")
    .setName("Funnel Type Name")
    .setGroup("Pipelines")
    .setType(types.TEXT);
  var userId = fields
    .newDimension()
    .setId("user_id")
    .setName("User ID")
    .setGroup("Pipelines")
    .setType(types.NUMBER);
  var name = fields
    .newDimension()
    .setId("name")
    .setName("Name")
    .setGroup("Pipelines")
    .setType(types.TEXT);
  var description = fields
    .newDimension()
    .setId("description")
    .setName("Description")
    .setGroup("Pipelines")
    .setType(types.TEXT);
  var order = fields
    .newDimension()
    .setId("order")
    .setName("Order")
    .setGroup("Pipelines")
    .setType(types.NUMBER);
  var isMain = fields
    .newDimension()
    .setId("is_main")
    .setName("Is Main")
    .setGroup("Pipelines")
    .setType(types.BOOLEAN);
  var limitTime = fields
    .newDimension()
    .setId("limit_time")
    .setName("LimitTime")
    .setGroup("Pipelines")
    .setType(types.NUMBER);
  var visibility = fields
    .newDimension()
    .setId("visibility")
    .setName("Visibility")
    .setGroup("Pipelines")
    .setType(types.NUMBER);

  fields.setDefaultDimension(name.getId());

  return fields;
}
