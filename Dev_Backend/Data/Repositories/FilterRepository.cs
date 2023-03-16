using System.Dynamic;

namespace Dev_Backend.Data.Repositories
{
    public class FilterRepository : RepositoryBase<DbContext>
    {
        public FilterRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public string GetWhereOfTerms(
                string? termsInput,
                string[] sqlColumnNames)
        {
            if (string.IsNullOrWhiteSpace(termsInput))
            {
                return "";
            }
            var andTemplate = " AND (";
            int indexSqlColumn = 0;
            foreach (var iSqlColumnName in sqlColumnNames)
            {
                if (indexSqlColumn > 0)
                {
                    andTemplate += " OR ";
                }
                andTemplate += "INSTR(LOWER(" + iSqlColumnName + "), LOWER(@_Term{0}))";
                indexSqlColumn++;
            }
            andTemplate += ")";

            var whereOfTerms = "";
            var termsInputAsArray = termsInput.Split(separator: ' ', options: StringSplitOptions.RemoveEmptyEntries);
            var indexTerms = 1;
            foreach (var iTerm in termsInputAsArray)
            {
                whereOfTerms += string.Format(andTemplate, indexTerms);
                indexTerms++;
            }
            System.Console.WriteLine("where of terms:");
            System.Console.WriteLine(whereOfTerms);
            return whereOfTerms;
        }

        public void AddTerms(
                IDictionary<string, object?>? sqlParams,
                string? termsInput)
        {
            if (string.IsNullOrWhiteSpace(termsInput))
            {
                return;
            }
            var termsInputAsArray = termsInput.Split(separator: ' ', options: StringSplitOptions.RemoveEmptyEntries);
            var indexTerms = 1;
            if (sqlParams == null)
            {
                sqlParams = new Dictionary<string, object?>();
            }
            foreach (var iTerm in termsInputAsArray)
            {
                sqlParams.TryAdd("@_Term" + indexTerms, iTerm);
                indexTerms++;
            }
        }

    }
}