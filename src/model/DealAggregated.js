function getDealAggregatedFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  // Deal
  var id = fields
    .newDimension()
    .setId("id")
    .setName("Id Oportunidade")
    .setGroup("Deals Aggregated")
    .setDescription("Identificador da oportunidade")
    .setType(types.NUMBER);
  var title = fields
    .newDimension()
    .setId("title")
    .setName("Título da Oportunidade")
    .setGroup("Deals Aggregated")
    .setDescription("Identificador da oportunidade")
    .setType(types.TEXT);
  var order = fields
    .newDimension()
    .setId("order")
    .setName("Ordem da Oportunidade")
    .setGroup("Deals Aggregated")
    .setDescription("Ordem da oportunidade na etapa.")
    .setType(types.NUMBER);
  var status = fields
    .newDimension()
    .setId("status")
    .setName("Status")
    .setGroup("Deals Aggregated")
    .setDescription("Status da oportunidade.")
    .setType(types.TEXT);
  var probability = fields
    .newDimension()
    .setId("probability")
    .setName("Probabilidade")
    .setGroup("Deals Aggregated")
    .setDescription("Probabilidade de fechamento da oportunidade, de 0 a 90")
    .setType(types.NUMBER);
  var reason_close = fields
    .newDimension()
    .setId("reason_close")
    .setName("Motivo de Fechamento")
    .setGroup("Deals Aggregated")
    .setDescription("Razão de fechamento de oportunidade.")
    .setType(types.TEXT);
  var temperature = fields
    .newDimension()
    .setId("temperature")
    .setName("Temperatura")
    .setGroup("Deals Aggregated")
    .setDescription(
      "Temperatura da oportunidade: 1 - muito quente, 2 - quente, 3 - morna, 4 - fria"
    )
    .setType(types.NUMBER);
  var deleted = fields
    .newDimension()
    .setId("deleted")
    .setName("Deletado")
    .setGroup("Deals Aggregated")
    .setDescription("Oportunidade deletada")
    .setType(types.BOOLEAN);
  var freezed = fields
    .newDimension()
    .setId("freezed")
    .setName("Congelado")
    .setGroup("Deals Aggregated")
    .setDescription("Oportunidade congelada")
    .setType(types.BOOLEAN);
  var frozenAT = fields
    .newDimension()
    .setId("frozen_at")
    .setName("Data de Congelamento")
    .setGroup("Deals Aggregated")
    .setDescription("Data do congelamento.")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var createdAt = fields
    .newDimension()
    .setId("created_at")
    .setName("Data de Criação")
    .setGroup("Deals Aggregated")
    .setDescription("Data de criação da oportunidade.")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var closedAt = fields
    .newDimension()
    .setId("closed_at")
    .setName("Data de Fechamento")
    .setGroup("Deals Aggregated")
    .setDescription("Data de fechamento da oportunidade.")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var lastContactAt = fields
    .newDimension()
    .setId("last_contact_at")
    .setName("Data de Último Contato")
    .setGroup("Deals Aggregated")
    .setDescription("Data do último contato feito na oportunidade.")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var lastStageUpdatedAt = fields
    .newDimension()
    .setId("last_stage_updated_at")
    .setName("Data de Última Atualização de Etapa")
    .setGroup("Deals Aggregated")
    .setDescription("Data de atualização do último stage.")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var value = fields
    .newMetric()
    .setId("value")
    .setName("Valor P&S")
    .setGroup("Deals Aggregated")
    .setDescription("Valor da oportunidade.")
    .setType(types.NUMBER);
  var value_mrr = fields
    .newMetric()
    .setId("value_mrr")
    .setName("Valor MRR")
    .setGroup("Deals Aggregated")
    .setDescription("Valor MRR da oportunidade.")
    .setType(types.NUMBER);

  // City
  var uf = fields
    .newDimension()
    .setId("city.uf")
    .setName("UF")
    .setGroup("Deals Aggregated")
    .setDescription("UF da cidade")
    .setType(types.TEXT);
  var cityName = fields
    .newDimension()
    .setId("city.name")
    .setName("Cidade")
    .setGroup("Deals Aggregated")
    .setDescription("Nome da cidade")
    .setType(types.TEXT);

  // Company
  var companyName = fields
    .newDimension()
    .setId("company.name")
    .setName("Nome da Empresa")
    .setGroup("Deals Aggregated")
    .setDescription("Nome da empresa")
    .setType(types.TEXT);

  // Lost Reason
  // var lostReasonName = fields
  //   .newDimension()
  //   .setId("lost_reason_name")
  //   .setName("Lost Reason Name")
  //   .setGroup("Deals Aggregated")
  //   .setDescription("Nome do motivo de perda da oportunidade")
  //   .setType(types.TEXT);

  // Orgin
  var originName = fields
    .newDimension()
    .setId("origin.name")
    .setName("Nome da Origem")
    .setGroup("Deals Aggregated")
    .setDescription("Nome da origem")
    .setType(types.TEXT);

  // Pipeline
  var funnelTypeName = fields
    .newDimension()
    .setId("pipeline.funnel_type_name")
    .setName("Tipo de Funil")
    .setGroup("Deals Aggregated")
    .setDescription("Nome do tipo de funil")
    .setType(types.TEXT);
  var funnelName = fields
    .newDimension()
    .setId("pipeline.name")
    .setName("Nome do Funil")
    .setGroup("Deals Aggregated")
    .setDescription("Nome do funil")
    .setType(types.TEXT);
  var funnelOrder = fields
    .newDimension()
    .setId("pipeline.order")
    .setName("Ordem do Funil")
    .setGroup("Deals Aggregated")
    .setDescription("Ordem do funil de vendas na lista")
    .setType(types.NUMBER);

  // Stages
  var stageName = fields
    .newDimension()
    .setId("stage.name")
    .setName("Nome da Etapa")
    .setGroup("Deals Aggregated")
    .setDescription("Nome da etapa")
    .setType(types.TEXT);
  var stageOrder = fields
    .newDimension()
    .setId("stage.order")
    .setName("Ordem da Etapa")
    .setGroup("Deals Aggregated")
    .setDescription("Ordem da etapa dentro do funil")
    .setType(types.NUMBER);

  // Owner
  var ownerName = fields
    .newDimension()
    .setId("owner.name")
    .setName("Dono da Oportunidade")
    .setGroup("Deals Aggregated")
    .setDescription("Nome da dono")
    .setType(types.TEXT);

  fields.setDefaultDimension(id.getId());
  fields.setDefaultMetric(value.getId());

  return fields;
}
