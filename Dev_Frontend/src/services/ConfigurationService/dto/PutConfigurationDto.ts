import GetPeriodConfigurationDto from "./GetPeriodConfigurationDto";

export default class PutConfigurationDto {
    constructor(
      public i_Cod_Configuracao: number = 0,
      public i_Minimo_Alunos: number = 0,
      public i_Maximo_Alunos: number = 0,
      public i_Duracao_Meses_Temporada: number = 0,
      public periodConfigurations: GetPeriodConfigurationDto[] = [],
    ) { }
  }