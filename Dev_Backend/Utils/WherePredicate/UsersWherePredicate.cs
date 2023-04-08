using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dev_Backend.Utils.WherePredicate
{
    public class UsersWherePredicate
    {
        public static string GetUserFilterWhere<T>(T parameter) where T : class
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                Type type = typeof(T);

                var itens = type.GetProperties();

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
                            case "userName":
                                sb.Append($" AND u.{columnName} LIKE CONCAT('%',@{property.Name},'%') ");
                                break;

                            case "studantRa":
                                sb.Append($" AND u.{columnName} = @{property.Name} ");
                                break;

                            case "gender":
                                sb.Append($" AND u.{columnName} = @{property.Name} ");
                                break;

                            case "motherName":
                                sb.Append($" AND u.{columnName} LIKE CONCAT('%',@{property.Name},'%') ");
                                break;

                            case "B_E_Ativo":
                                sb.Append($" AND u.{columnName} = @{property.Name} ");
                                break;

                            case "perfil":
                                break;

                            case "fieldOrderLabel":
                                break;

                            case "isDesc":
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
                                sb.Append($" AND u.{columnName} = @{property.Name} ");
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