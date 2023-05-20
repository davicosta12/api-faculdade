import { TimeRange } from "../../_commons/FinalForm/FinalInputTimeRange";
import { getNullDateFromAPI } from "../../misc/utils/utils";
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
      if (this.d_Hora_Inicio != null && this.d_Hora_Fim != null) {
        const fromRawData = new TimeRange();
        fromRawData.startTime = this.d_Hora_Inicio;
        fromRawData.endTime = this.d_Hora_Fim;
        this.timeRange = fromRawData;
      }
    }

    public rowKey: number;
    public timeRange: TimeRange = new TimeRange();

    public static FromGet(periodConfiguration: GetPeriodConfigurationDto): PeriodConfiguration {
      const parsed = new PeriodConfiguration(
        periodConfiguration.i_Cod_Configuracao_De_Periodo,
        periodConfiguration.s_Nome,
        periodConfiguration.c_Sigla,
        getNullDateFromAPI(periodConfiguration.d_Hora_Inicio),
        getNullDateFromAPI(periodConfiguration.d_Hora_Fim),
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