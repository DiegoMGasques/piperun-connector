function getCitiesFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  var id = fields
    .newDimension()
    .setId("id")
    .setName("Identifier")
    .setGroup("Cities")
    .setType(types.NUMBER);
  var uf = fields
    .newDimension()
    .setId("uf")
    .setName("UF")
    .setGroup("Cities")
    .setType(types.TEXT);
  var name = fields
    .newDimension()
    .setId("name")
    .setName("Name")
    .setGroup("Cities")
    .setType(types.TEXT);

  fields.setDefaultDimension(name.getId());

  return fields;
}
