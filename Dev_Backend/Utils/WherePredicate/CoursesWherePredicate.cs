using System.Text;

namespace Dev_Backend.Utils.WherePredicate
{
    public class CoursesWherePredicate
    {
        public static string GetCoursesFilterWhere<T>(T parameter) where T : class
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                Type type = typeof(T);

                var itens = type.GetProperties();
                string calculateNextDate = @"
                    (
                        select
                            t.D_Data_Inicio
                        from Turma t
                        where t.I_Cod_Curso = c.I_Cod_Curso and t.D_Data_Inicio >= curdate()
                        order by t.D_Data_Inicio desc
                        limit 1
                    )
                ".Replace(Environment.NewLine, "");

                foreach (var property in itens)
                {
                    var attr = property.GetCustomAttributes(true).FirstOrDefault(x => x.GetType() == typeof(ColumnDbName));
                    var columnName = "";

                    var value = property.GetValue(parameter);

                    if (value != null)
                    {
                        if (attr != null)
                        {
                            columnName = ((ColumnDbName)attr).ColumnName;
                        }
                        else
                        {
                            columnName = property.Name;
                        }

                        switch (property.Name)
                        {
                            case "serial":
                                sb.Append($" AND c.{columnName} LIKE GROUP_CONCAT('%',@{property.Name},'%') ");
                                break;

                            case "name":
                                sb.Append($" AND c.{columnName} LIKE GROUP_CONCAT('%',@{property.Name},'%') ");
                                break;

                            case "priceExact":
                                sb.Append($" AND c.{columnName} = @{property.Name} ");
                                break;

                            case "priceDe":
                                sb.Append($" AND c.{columnName} >= @{property.Name} ");
                                break;

                            case "priceAte":
                                sb.Append($" AND c.{columnName} <= @{property.Name} ");
                                break;

                            case "nextClassroomStartDateExact":
                                sb.Append($" AND {calculateNextDate} IS NOT NULL AND {calculateNextDate} = @{property.Name} ");
                                break;

                            case "nextClassroomStartDateDe":
                                sb.Append($" AND {calculateNextDate} IS NOT NULL AND {calculateNextDate} >= @{property.Name} ");
                                break;

                            case "nextClassroomStartDateAte":
                                sb.Append($" AND {calculateNextDate} IS NOT NULL AND {calculateNextDate} <= @{property.Name} ");
                                break;

                            case "isAdvancedSearch":
                                break;

                            case "termsInput":
                                break;

                            // case "branchPlatformId":
                            //     string platformValue = String.Join(",", ((List<int>)value).Select(x => x.ToString()).ToArray());
                            //     sb.Append($" o.{columnName} IN ({platformValue}) AND ");
                            //     break;

                            default:
                                sb.Append($" AND c.{columnName} = @{property.Name} ");
                                break;
                        }
                    }
                }

                var whereResult = sb.ToString();

                return whereResult.Length > 0 ? whereResult.Substring(0, whereResult.Length - 1) : whereResult;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}