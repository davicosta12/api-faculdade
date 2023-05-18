import GetConfigurationDto from "./GetConfigurationDto";
import GetPeriodConfigurationDto from "./GetPeriodConfigurationDto";

export default class PutConfigurationDto {
    constructor(
      public i_Cod_Configuracao: number | null = null,
      public i_Minimo_Alunos: number | null = null,
      public i_Maximo_Alunos: number | null = null,
      public i_Duracao_Meses_Temporada: number | null = null,
      public periodConfigurations: GetPeriodConfigurationDto[] = [],
    ) { }

    static FromGet(configuration: GetConfigurationDto): PutConfigurationDto {
      const parsed = new PutConfigurationDto(
        configuration.i_Cod_Configuracao,
        configuration.i_Minimo_Alunos,
        configuration.i_Maximo_Alunos,
        configuration.i_Duracao_Meses_Temporada,
        configuration.periodConfigurations
      );
      return parsed;
    }
  }