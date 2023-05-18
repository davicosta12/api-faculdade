using System.ComponentModel.DataAnnotations;

namespace Dev_Backend.Data.Models.Configurations
{
    public class Configuration
    {
        public int I_Cod_Configuracao { get; set; }
        public int I_Minimo_Alunos { get; set; }
        public int I_Maximo_Alunos { get; set; }
        public int I_Duracao_Meses_Temporada { get; set; }
        public List<PeriodConfiguration> PeriodConfigurations { get; set; } = new();
    }

    public class PeriodConfiguration
    {
        public int I_Cod_Configuracao_De_Periodo { get; set; }
        public string S_Nome { get; set; }
        public string C_Sigla { get; set; }
        public DateTime D_Hora_Inicio { get; set; }
        public DateTime D_Hora_Fim { get; set; }
        public bool B_E_Hora_Fim_No_Dia_Seguinte { get; set; }
    }

    public class PutConfiguration
    {
        public int I_Minimo_Alunos { get; set; }
        public int I_Maximo_Alunos { get; set; }
        public int I_Duracao_Meses_Temporada { get; set; }

        public List<PeriodConfiguration> PeriodConfigurations { get; set; } = new();
    }
}