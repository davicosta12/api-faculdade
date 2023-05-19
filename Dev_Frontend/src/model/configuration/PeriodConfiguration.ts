import GetPeriodConfigurationDto from "../../services/ConfigurationService/dto/GetPeriodConfigurationDto";

export default class PeriodConfiguration extends GetPeriodConfigurationDto {
    constructor(
      i_Cod_Configuracao_De_Periodo: number = 0,
      s_Nome: string = '',
      c_Sigla: string = '',
      d_Hora_Inicio: Date | null = null,
      d_Hora_Fim: Date | null = null,
      b_E_Hora_Fim_No_Dia_Seguinte: boolean = false,
      rowKey: number = +window.crypto.getRandomValues(new Uint32Array(1)),
    ) {
      super(i_Cod_Configuracao_De_Periodo, s_Nome, c_Sigla, d_Hora_Inicio, d_Hora_Fim, b_E_Hora_Fim_No_Dia_Seguinte);
      this.rowKey = rowKey;
    }

    public rowKey: number;

    public static FromGet(periodConfiguration: GetPeriodConfigurationDto): PeriodConfiguration {
      const parsed = new PeriodConfiguration(
        periodConfiguration.i_Cod_Configuracao_De_Periodo,
        periodConfiguration.s_Nome,
        periodConfiguration.c_Sigla,
        periodConfiguration.d_Hora_Inicio,
        periodConfiguration.d_Hora_Fim,
        periodConfiguration.b_E_Hora_Fim_No_Dia_Seguinte
      );
      return parsed;
    }

    public AsDto(): GetPeriodConfigurationDto {
      const parsed = new GetPeriodConfigurationDto(
        this.i_Cod_Configuracao_De_Periodo,
        this.s_Nome,
        this.c_Sigla,
        this.d_Hora_Inicio,
        this.d_Hora_Fim,
        this.b_E_Hora_Fim_No_Dia_Seguinte
      );
      return parsed;
    }

  }