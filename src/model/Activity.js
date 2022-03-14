// function getActivitiesFields() {
//   var cc = DataStudioApp.createCommunityConnector();
//   var fields = cc.getFields();
//   var types = cc.FieldType;
//   var aggregations = cc.AggregationType;

//   var id = fields
//     .newDimension()
//     .setId("id")
//     .setName("Identifier")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var status = fields
//     .newDimension()
//     .setId("status")
//     .setName("Status")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var appointmentId = fields
//     .newDimension()
//     .setId("appointment_id")
//     .setName("Appointment ID")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var activityTypeId = fields
//     .newDimension()
//     .setId("activity_type_id")
//     .setName("Activity Type ID")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var ownerId = fields
//     .newDimension()
//     .setId("owner_id")
//     .setName("Owner ID")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var accountId = fields
//     .newDimension()
//     .setId("account_id")
//     .setName("Account ID")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var dealId = fields
//     .newDimension()
//     .setId("deal_id")
//     .setName("Deal ID")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var timeUtilized = fields
//     .newDimension()
//     .setId("time_utilized")
//     .setName("Time Utilized")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var timeEstimated = fields
//     .newDimension()
//     .setId("time_estimated")
//     .setName("Time Estimated")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var duration = fields
//     .newMetric()
//     .setId("duration")
//     .setName("Duration (In Minutes)")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var priority = fields
//     .newDimension()
//     .setId("priority")
//     .setName("Priority")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var type = fields
//     .newDimension()
//     .setId("type")
//     .setName("Type")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var requesterId = fields
//     .newDimension()
//     .setId("requester_id")
//     .setName("Requester ID")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var title = fields
//     .newDimension()
//     .setId("title")
//     .setName("Title")
//     .setGroup("Activities")
//     .setType(types.TEXT);
//   var description = fields
//     .newDimension()
//     .setId("description")
//     .setName("Description")
//     .setGroup("Activities")
//     .setType(types.TEXT);
//   var comment = fields
//     .newDimension()
//     .setId("comment")
//     .setName("Comment")
//     .setGroup("Activities")
//     .setType(types.TEXT);
//   var appearinLink = fields
//     .newDimension()
//     .setId("appearin_link")
//     .setName("Appearin Link")
//     .setGroup("Activities")
//     .setType(types.TEXT);
//   var order = fields
//     .newDimension()
//     .setId("order")
//     .setName("Order")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var lat = fields
//     .newDimension()
//     .setId("lat")
//     .setName("Latitude")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var lng = fields
//     .newDimension()
//     .setId("lng")
//     .setName("Longitude")
//     .setGroup("Activities")
//     .setType(types.NUMBER);
//   var deliveryDate = fields
//     .newDimension()
//     .setId("delivery_date")
//     .setName("Delivery Date")
//     .setGroup("Activities")
//     .setType(types.YEAR_MONTH_DAY);
//   var startAt = fields
//     .newDimension()
//     .setId("start_at")
//     .setName("Start At")
//     .setGroup("Activities")
//     .setType(types.YEAR_MONTH_DAY);
//   var endAt = fields
//     .newDimension()
//     .setId("end_at")
//     .setName("End At")
//     .setGroup("Activities")
//     .setType(types.YEAR_MONTH_DAY);
//   var internalDate = fields
//     .newDimension()
//     .setId("internal_date")
//     .setName("Internal Date")
//     .setGroup("Activities")
//     .setType(types.YEAR_MONTH_DAY);
//   var createdAt = fields
//     .newDimension()
//     .setId("created_at")
//     .setName("Created At")
//     .setGroup("Activities")
//     .setType(types.YEAR_MONTH_DAY);
//   var updatedAt = fields
//     .newDimension()
//     .setId("updated_at")
//     .setName("Updated At")
//     .setGroup("Activities")
//     .setType(types.YEAR_MONTH_DAY);

//   fields.setDefaultMetric(duration.getId());
//   fields.setDefaultDimension(title.getId());

//   return fields;
// }
