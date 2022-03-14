function getStageHistoryFields() {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;

  var id = fields
    .newDimension()
    .setId("stageHistories[i].id")
    .setName("Id")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var accountId = fields
    .newDimension()
    .setId("stageHistories[i].account_id")
    .setName("Id da Conta")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var dealId = fields
    .newDimension()
    .setId("stageHistories[i].deal_id")
    .setName("Id da Oportunidade")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var inStageId = fields
    .newDimension()
    .setId("stageHistories[i].in_stage_id")
    .setName("Id da Etapa de Entrada")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var outStageId = fields
    .newDimension()
    .setId("stageHistories[i].out_stage_id")
    .setName("Id da Etapa de Saída")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var inUserId = fields
    .newDimension()
    .setId("stageHistories[i].in_user_id")
    .setName("Id do Usuário de Entrada")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var outUserId = fields
    .newDimension()
    .setId("stageHistories[i].out_user_id")
    .setName("Id do Usuário de Saída")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var inDate = fields
    .newDimension()
    .setId("stageHistories[i].in_date")
    .setName("Data de Entrada")
    .setGroup("Deals History")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var outDate = fields
    .newDimension()
    .setId("stageHistories[i].out_date")
    .setName("Data de Saída")
    .setGroup("Deals History")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var inStageName = fields
    .newDimension()
    .setId("stageHistories[i].inStageName")
    .setName("Nome Etapa Entrada")
    .setGroup("Deals History")
    .setType(types.TEXT);
  var outStageName = fields
    .newDimension()
    .setId("stageHistories[i].outStageName")
    .setName("Nome Etapa Saída")
    .setGroup("Deals History")
    .setType(types.TEXT);
  var inPipelineName = fields
    .newDimension()
    .setId("stageHistories[i].inPipelineName")
    .setName("Nome do Funil")
    .setGroup("Deals History")
    .setType(types.TEXT);
  var leadTime = fields
    .newDimension()
    .setId("stageHistories[i].lead_time")
    .setName("Lead Time")
    .setGroup("Deals History")
    .setType(types.TEXT);

  var inUserName = fields
    .newDimension()
    .setId("owner.name")
    .setName("Nome Usuário Entrada")
    .setGroup("Deals History")
    .setType(types.TEXT);
  var outUserName = fields
    .newDimension()
    .setId("owner.name")
    .setName("Nome Usuário Saída")
    .setGroup("Deals History")
    .setType(types.TEXT);

  var createdAt = fields
    .newDimension()
    .setId("created_at")
    .setName("Data de Criação")
    .setGroup("Deals History")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var freezed = fields
    .newDimension()
    .setId("freezed")
    .setName("Oportunidade Congelada")
    .setGroup("Deals History")
    .setType(types.BOOLEAN);

  var status = fields
    .newDimension()
    .setId("status")
    .setName("Status")
    .setGroup("Deals History")
    .setType(types.TEXT);
  var closedAt = fields
    .newDimension()
    .setId("closed_at")
    .setName("Data de Fechamento")
    .setGroup("Deals History")
    .setType(types.YEAR_MONTH_DAY_SECOND);
  var valueMRR = fields
    .newDimension()
    .setId("value_mrr")
    .setName("Valor MRR")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var value = fields
    .newDimension()
    .setId("value")
    .setName("Valor P&S")
    .setGroup("Deals History")
    .setType(types.NUMBER);
  var originName = fields
    .newDimension()
    .setId("origin.name")
    .setName("Nome da origem")
    .setGroup("Deals History")
    .setType(types.TEXT);

  fields.setDefaultDimension(id.getId());

  return fields;
}
