function getPersonsFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  var id = fields
    .newDimension()
    .setId("id")
    .setName("Identifier")
    .setGroup("Persons")
    .setType(types.NUMBER);
  var name = fields
    .newDimension()
    .setId("name")
    .setName("Name")
    .setGroup("Persons")
    .setType(types.TEXT);
  var cityId = fields
    .newDimension()
    .setId("city_id")
    .setName("City ID")
    .setGroup("Persons")
    .setType(types.NUMBER);
  var district = fields
    .newDimension()
    .setId("district")
    .setName("District")
    .setGroup("Persons")
    .setType(types.TEXT);
  var birthday = fields
    .newDimension()
    .setId("birth_day")
    .setName("Birthday")
    .setGroup("Persons")
    .setType(types.YEAR_MONTH_DAY);
  var status = fields
    .newDimension()
    .setId("status")
    .setName("Status")
    .setGroup("Persons")
    .setType(types.BOOLEAN);
  var CreatedAt = fields
    .newDimension()
    .setId("created_at")
    .setName("Created At")
    .setGroup("Company")
    .setType(types.YEAR_MONTH_DAY);

  fields.setDefaultDimension(name.getId());

  return fields;
}
