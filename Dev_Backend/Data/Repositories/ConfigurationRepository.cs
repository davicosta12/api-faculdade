using api_faculdade.Bussiness.API;
using Dev_Backend.Bussiness.API.GenericPagings;
using Dev_Backend.Data.Models.Configurations;
using Dev_Backend.Data.Models.Users;
using Dev_Backend.Extensions;
using Dev_Backend.Maqui.Data.Models;
using Dev_Backend.Utils.WherePredicate;

namespace Dev_Backend.Data.Repositories
{
    public class ConfigurationRepository : RepositoryBase<DbContext>
    {
        public ConfigurationRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public async Task<Configuration?> GetConfiguration()
        {
            string sql = @$"
                SELECT
                    c.I_Cod_Configuracao,
                    c.I_Minimo_Alunos,
                    c.I_Maximo_Alunos,
                    c.I_Duracao_Meses_Temporada
                FROM Configuracao c;
                    
                SELECT
                    cdp.I_Cod_Configuracao_De_Periodo,
                    cdp.S_Nome,
                    cdp.C_Sigla,
                    cdp.D_Hora_Inicio,
                    cdp.D_Hora_Fim,
                    cdp.B_E_Hora_Fim_No_Dia_Seguinte
                FROM Configuracao_De_Periodo cdp;
            ";

            var reader = await QueryMultipleAsync(sql);

            var result = reader.Read<Configuration>().FirstOrDefault();
            if (result is null)
            {
                return null;
            }
            result.PeriodConfigurations = reader.Read<PeriodConfiguration>().ToList();

            return result;
        }

        private string UpdateConfigurationQuery(PutConfiguration nextConfiguration, Dictionary<string, object?> sqlParams)
        {
            string sql = @$"
                UPDATE Configuracao SET
                    I_Minimo_Alunos = @Minimo_Alunos,
                    I_Maximo_Alunos = @Maximo_Alunos,
                    I_Duracao_Meses_Temporada = @Duracao_Meses_Temporada;
            ";
            sqlParams.Add("@Minimo_Alunos", nextConfiguration.I_Minimo_Alunos);
            sqlParams.Add("@Maximo_Alunos", nextConfiguration.I_Maximo_Alunos);
            sqlParams.Add("@Duracao_Meses_Temporada", nextConfiguration.I_Duracao_Meses_Temporada);
            return sql;
        }

        private string UpdatePeriodConfigurationsQuery(
            List<PeriodConfiguration> nextPeriodConfigurations,
            List<PeriodConfiguration> PeriodConfigurations,
            Dictionary<string, object?> sqlParams
        )
        {
            string sql = "";
            int indexNew = 1;
            var notUpdated = new HashSet<int>(PeriodConfigurations.Select(x => x.I_Cod_Configuracao_De_Periodo));
            foreach (var iNextPeriodConfiguration in nextPeriodConfigurations)
            {
                int cod = iNextPeriodConfiguration.I_Cod_Configuracao_De_Periodo;
                if (cod == 0)
                {
                    sql += @$"
                        INSERT INTO Configuracao_De_Periodo (
                            S_Nome, C_Sigla, D_Hora_Inicio, D_Hora_Fim, B_E_Hora_Fim_No_Dia_Seguinte
                        ) VALUES (
                            @Nome_{indexNew}_NEW, @Sigla_{indexNew}_NEW, @Hora_Inicio_{indexNew}_NEW, @Hora_Fim_{indexNew}_NEW,
                            @E_Hora_Fim_No_Dia_Seguinte_{indexNew}_NEW
                        );
                    ";
                    sqlParams.Add($"@Nome_{indexNew}_NEW", iNextPeriodConfiguration.S_Nome);
                    sqlParams.Add($"@Sigla_{indexNew}_NEW", iNextPeriodConfiguration.C_Sigla);
                    sqlParams.Add($"@Hora_Inicio_{indexNew}_NEW", iNextPeriodConfiguration.D_Hora_Inicio);
                    sqlParams.Add($"@Hora_Fim_{indexNew}_NEW", iNextPeriodConfiguration.D_Hora_Fim);
                    sqlParams.Add($"@E_Hora_Fim_No_Dia_Seguinte_{indexNew}_NEW", iNextPeriodConfiguration.B_E_Hora_Fim_No_Dia_Seguinte);
                    indexNew++;
                    continue;
                }

                notUpdated.Remove(cod);

                sql += @$"
                    UPDATE Configuracao_De_Periodo SET
                        S_Nome = @Nome_{cod},
                        C_Sigla = @Sigla_{cod},
                        D_Hora_Inicio = @Hora_Inicio_{cod},
                        D_Hora_Fim = @Hora_Fim_{cod},
                        B_E_Hora_Fim_No_Dia_Seguinte = @E_Hora_Fim_No_Dia_Seguinte_{cod}
                    WHERE I_Cod_Configuracao_De_Periodo = {cod};
                ";
                sqlParams.Add($"@Nome_{cod}", iNextPeriodConfiguration.S_Nome);
                sqlParams.Add($"@Sigla_{cod}", iNextPeriodConfiguration.C_Sigla);
                sqlParams.Add($"@Hora_Inicio_{cod}", iNextPeriodConfiguration.D_Hora_Inicio);
                sqlParams.Add($"@Hora_Fim_{cod}", iNextPeriodConfiguration.D_Hora_Fim);
                sqlParams.Add($"@E_Hora_Fim_No_Dia_Seguinte_{cod}", iNextPeriodConfiguration.B_E_Hora_Fim_No_Dia_Seguinte);
            }

            if (notUpdated.Any())
            {
                sql += @$"
                    DELETE FROM Configuracao_De_Periodo
                        WHERE I_Cod_Configuracao_De_Periodo IN ({string.Join(',', notUpdated)});
                ";
            }
            return sql;

        }

        public async Task UpdateConfiguration(PutConfiguration nextConfiguration)
        {
            var periodConfigurationsSql = @$"
                SELECT
                    cdp.I_Cod_Configuracao_De_Periodo,
                    cdp.S_Nome,
                    cdp.C_Sigla,
                    cdp.D_Hora_Inicio,
                    cdp.D_Hora_Fim,
                    cdp.B_E_Hora_Fim_No_Dia_Seguinte
                FROM Configuracao_De_Periodo cdp;
            ";

            var periodConfigurations = await QueryAsync<PeriodConfiguration>(periodConfigurationsSql);
            if (periodConfigurations is null)
            {
                periodConfigurations = new List<PeriodConfiguration>();
            }

            string sql = "";
            var sqlParams = new Dictionary<string, object?>();

            sql += UpdateConfigurationQuery(nextConfiguration, sqlParams);
            sql += UpdatePeriodConfigurationsQuery(nextConfiguration.PeriodConfigurations, periodConfigurations.ToList(), sqlParams);

            await ExecuteAsync(sql, sqlParams.AsExpandoObject());
        }
    }
}