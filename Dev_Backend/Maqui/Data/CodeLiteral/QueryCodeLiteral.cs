namespace Dev_Backend.Maqui.Data.CodeLiteral
{
    public class QueryCodeLiteral
    {
        public string QueryName { get; set; }
        public string QueryContent { get; set; }
        public IDictionary<string, object?> DefaultParameters { get; set; }
    }

    public static class QueryCodeLiteralMaker
    {
        public static IEnumerable<QueryCodeLiteral> GetAll()
        {
            return new QueryCodeLiteral[] {
                CoursesQueryCodeLiteralMaker.GetSelectPeriodos(),
                SubscriptionsQueryCodeLiteralMaker.GetSelectAlunos(),
                SubscriptionsQueryCodeLiteralMaker.GetSelectCursos(),
            };
        }

        public static QueryCodeLiteral? GetByQueryName(string? queryName)
        {
            if (queryName == null)
            {
                return null;
            }
            return QueryCodeLiteralMaker.GetAll().FirstOrDefault(x => x.QueryName == queryName);
        }
    }
}