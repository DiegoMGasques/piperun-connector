function getCompanyFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  var id = fields
    .newDimension()
    .setId("id")
    .setName("Identifier")
    .setGroup("Company")
    .setType(types.NUMBER);
  var name = fields
    .newDimension()
    .setId("name")
    .setName("Name")
    .setGroup("Company")
    .setType(types.TEXT);
  var CompanyName = fields
    .newDimension()
    .setId("company_name")
    .setName("Company Name")
    .setGroup("Company")
    .setType(types.TEXT);
  var SocialCapital = fields
    .newDimension()
    .setId("social_capital")
    .setName("Social Capital")
    .setGroup("Company")
    .setType(types.NUMBER);
  var SegmentId = fields
    .newDimension()
    .setId("segment_id")
    .setName("Segment ID")
    .setGroup("Company")
    .setType(types.NUMBER);
  var CityId = fields
    .newDimension()
    .setId("city_id")
    .setName("City ID")
    .setGroup("Company")
    .setType(types.NUMBER);
  var District = fields
    .newDimension()
    .setId("district")
    .setName("District")
    .setGroup("Company")
    .setType(types.TEXT);
  var CnaeId = fields
    .newDimension()
    .setId("cnae_id")
    .setName("CNAE ID")
    .setGroup("Company")
    .setType(types.NUMBER);
  var FoundationAt = fields
    .newDimension()
    .setId("foundation_at")
    .setName("Foundation At")
    .setGroup("Company")
    .setType(types.YEAR_MONTH_DAY);
  var Status = fields
    .newDimension()
    .setId("status")
    .setName("Status")
    .setGroup("Company")
    .setType(types.BOOLEAN);
  var Situation = fields
    .newDimension()
    .setId("company_situation")
    .setName("Company Situation")
    .setGroup("Company")
    .setType(types.NUMBER);
  var CreatedAt = fields
    .newDimension()
    .setId("created_at")
    .setName("Created At")
    .setGroup("Company")
    .setType(types.YEAR_MONTH_DAY);

  fields.setDefaultDimension(name.getId());

  return fields;
}
