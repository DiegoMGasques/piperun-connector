// function getSubGoalsFields() {
//   var cc = DataStudioApp.createCommunityConnector();
//   var fields = cc.getFields();
//   var types = cc.FieldType;
//   var aggregations = cc.AggregationType;

//   var id = fields
//     .newDimension()
//     .setId("id")
//     .setName("Identifier")
//     .setGroup("SubGoals")
//     .setType(types.NUMBER);
//   var accountId = fields
//     .newDimension()
//     .setId("account_id")
//     .setName("Account ID")
//     .setGroup("SubGoals")
//     .setType(types.NUMBER);
//   var goalId = fields
//     .newDimension()
//     .setId("goal_id")
//     .setName("Goal ID")
//     .setGroup("SubGoals")
//     .setType(types.NUMBER);
//   var userId = fields
//     .newDimension()
//     .setId("user_id")
//     .setName("User ID")
//     .setGroup("SubGoals")
//     .setType(types.NUMBER);
//   var createdAt = fields
//     .newDimension()
//     .setId("created_at")
//     .setName("Created At")
//     .setGroup("SubGoals")
//     .setType(types.YEAR_MONTH_DAY);
//   var updatedAt = fields
//     .newDimension()
//     .setId("updated_at")
//     .setName("Updated At")
//     .setGroup("SubGoals")
//     .setType(types.YEAR_MONTH_DAY);

//   var value = fields
//     .newMetric()
//     .setId("value")
//     .setName("Value")
//     .setGroup("SubGoals")
//     .setType(types.CURRENCY_BRL);

//   fields.setDefaultMetric(value.getId());
//   fields.setDefaultDimension(id.getId());

//   return fields;
// }
