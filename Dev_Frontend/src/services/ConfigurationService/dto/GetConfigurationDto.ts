import GetPeriodConfigurationDto from "./GetPeriodConfigurationDto";

export default interface GetConfigurationDto {
    i_Cod_Configuracao: number,
    i_Minimo_Alunos: number,
    i_Maximo_Alunos: number,
    i_Duracao_Meses_Temporada: number,
    periodConfigurations: GetPeriodConfigurationDto[],
}
/*

    public class Configuration
    {
        public int I_Cod_Configuracao { get; set; }
        public int I_Minimo_Alunos { get; set; }
        public int I_Maximo_Alunos { get; set; }
        public int I_Duracao_Meses_Temporada { get; set; }
        public List<PeriodConfiguration> PeriodConfigurations { get; set; } = new();
    }

*/