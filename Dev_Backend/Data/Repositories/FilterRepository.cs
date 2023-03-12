using Dev_Backend.Data.Models.Courses;
using Dev_Backend.Data.Models.GenericPagings;

namespace Dev_Backend.Data.Repositories
{
    public class FilterRepository : RepositoryBase<DbContext>
    {
        public FilterRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public string GetWhereOfTerms(
                string termsInput,
                string[] sqlColumnNames)
        {
            var andTemplate = " AND (";
            int indexSqlColumn = 0;
            foreach (var iSqlColumnName in sqlColumnNames)
            {
                if (indexSqlColumn > 0)
                {
                    andTemplate += " OR ";
                }
                andTemplate += "INSTR(LOWER(" + indexSqlColumn + "), LOWER(@_Term{0}))";
                indexSqlColumn++;
            }

            var whereOfTerms = "";
            var termsInputAsArray = termsInput.Split(separator: ' ', options: StringSplitOptions.RemoveEmptyEntries);
            var indexTerms = 1;
            foreach (var iTerm in termsInputAsArray)
            {
                whereOfTerms += string.Format(andTemplate, indexTerms);
                indexTerms++;
            }
            return whereOfTerms;
        }

        public void AddTerms(
                dynamic parameters,
                string termsInput)
        {
            var termsInputAsArray = termsInput.Split(separator: ' ', options: StringSplitOptions.RemoveEmptyEntries);
            var indexTerms = 1;
            foreach (var iTerm in termsInputAsArray)
            {
                (parameters as Dictionary<string, object>).Add("@_Term" + indexTerms, iTerm);
                indexTerms++;
            }
        }

    }
}