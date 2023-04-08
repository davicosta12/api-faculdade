using Dev_Backend.Bussiness.API.GenericPagings;
using Dev_Backend.Data;
using Dev_Backend.Data.Repositories;
using Dev_Backend.Extensions;
using Dev_Backend.Maqui.Business;
using Dev_Backend.Maqui.Data.CodeLiteral;

namespace Dev_Backend.Maqui.Data.Repositories
{
    public class QueryRepository : RepositoryBase<DbContext>
    {
        public QueryRepository(DbContext dbContext) : base(dbContext)
        {

        }

        public async Task<GenericPaging<FKOption>> GetOptionsForFKField(
            string? descriptionColumn,
            string? queryName,
            string? queryParameterName,
            string? queryParameterValue,
            int? firstPageSize = 20)
        {
            var queryCodeLiteral = QueryCodeLiteralMaker.GetByQueryName(queryName);
            if (queryCodeLiteral == null)
            {
                throw new NotImplementedException("Query named " + queryName + " does not exist");
            }
            
            var sqlParams = string.IsNullOrWhiteSpace(queryParameterValue)
                ? new Dictionary<string, object?>()
                : new Dictionary<string, object?> { ["@" + queryParameterName] = queryParameterValue, };
            foreach(var defaultParam in queryCodeLiteral.DefaultParameters)
            {
                sqlParams.TryAdd(defaultParam.Key, defaultParam.Value);
            }
            var sqlReplaced = queryCodeLiteral.QueryContent.Replace("^DescriptionColumn", descriptionColumn);
            
            var reader = await QueryMultipleAsync(sqlReplaced, sqlParams.AsExpandoObject());
            int totalCount = reader.Read<int>().FirstOrDefault();
            var options = reader.Read<FKOption>().ToList();

            var result = new GenericPaging<FKOption>(options, totalCount, 1, firstPageSize);
            return result;
        }

        public async Task<FKOption> GetOptionByCod(int? cod, string? descriptionColumn, string? queryName)
        {
            var queryCodeLiteral = QueryCodeLiteralMaker.GetByQueryName(queryName);
            if (queryCodeLiteral == null)
            {
                throw new NotImplementedException("Query named " + queryName + " does not exist");
            }
            
            var sqlParams = new Dictionary<string, object?> { ["@I_Cod"] = cod, };
            foreach(var defaultParam in queryCodeLiteral.DefaultParameters)
            {
                sqlParams.TryAdd(defaultParam.Key, defaultParam.Value);
            }
            var sqlReplaced = queryCodeLiteral.QueryContent.Replace("^DescriptionColumn", descriptionColumn);
            
            var reader = await QueryMultipleAsync(sqlReplaced, sqlParams.AsExpandoObject());
            int totalCount = reader.Read<int>().FirstOrDefault();
            var options = reader.Read<FKOption>().ToList();

            var result = options.FirstOrDefault();
            return result;
        }
    }
}