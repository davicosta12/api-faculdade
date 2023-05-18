export default class GetPeriodConfigurationDto {
    constructor(
      public i_Cod_Configuracao_De_Periodo: number = 0,
      public s_Nome: string = '',
      public c_Sigla: string = '',
      public d_Hora_Inicio: Date | null = null,
      public d_Hora_Fim: Date | null = null,
      public b_E_Hora_Fim_No_Dia_Seguinte: boolean = false,
    ) { }
  }
/*

    public class PeriodConfiguration
    {
        public int I_Cod_Configuracao_De_Periodo { get; set; }
        public string S_Nome { get; set; }
        public string C_Sigla { get; set; }
        public DateTime D_Hora_Inicio { get; set; }
        public DateTime D_Hora_Fim { get; set; }
        public bool B_E_Hora_Fim_No_Dia_Seguinte { get; set; }
    } 
*/