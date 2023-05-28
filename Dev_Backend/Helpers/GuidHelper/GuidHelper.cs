using Dev_Backend.Data;
using Dev_Backend.Data.Repositories;
using static Dapper.SqlMapper;

namespace Dev_Backend.Helpers
{
    public class GuidHelper
    {
        public List<GuidUnit> Units { get; set; } = new();
        public List<GuidColumnListener> Listeners { get; set; } = new();
        public string RetrieveSQLKeysQuery(Dictionary<string, object?> sqlParams)
        {
            string sql = "";
            int codN = 1;
            sqlParams = new Dictionary<string, object?>();
            foreach (var iUnit in Units)
            {
                sql += $"select I_Cod_{iUnit.HelpedTable} from {iUnit.HelpedTable} r where r.S_Pre_Cod = @cod{codN};";
                sqlParams.Add($"@cod{codN}", iUnit.Guid);
                codN++;
            }
            return sql;
        }
        public void ReadRetrieveSQLKeys(GridReader reader)
        {
            foreach (var iUnit in Units)
            {
                iUnit.SQLKey = reader.Read<int>().FirstOrDefault();
            }
        }
        public string SynchronizeListenersQuery(Dictionary<string, object?> sqlParams)
        {
            string sql = "";
            int codN = 1;
            sqlParams = new Dictionary<string, object?>();
            foreach (var iListener in Listeners)
            {
                var unit = Units.FirstOrDefault(x => x.Guid == iListener.GuidListened && x.SQLKey != null);
                if (unit == null)
                {
                    continue;
                }
                sql += $"update {iListener.HelpedTable} set I_Cod_{iListener.HelpedTable} = @cod{codN} where S_Pre_Cod_{unit.HelpedTable} = @guid{codN};";
                sqlParams.Add($"@cod{codN}", unit.SQLKey);
                sqlParams.Add($"@guid{codN}", unit.Guid);
                codN++;
            }
            return sql;
        }
    }

    public class GuidUnit
    {
        public int? SQLKey { get; set; }
        public string Guid { get; set; } = "";
        public string HelpedTable { get; set; } = "";
    }

    public class GuidColumnListener
    {
        public string GuidListened { get; set; } = "";
        public string HelpedTable { get; set; } = "";
    }
}