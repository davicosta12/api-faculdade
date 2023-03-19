namespace Dev_Backend.Maqui.Data.CodeLiteral
{

    public static class SubscriptionsQueryCodeLiteralMaker
    {
        public static QueryCodeLiteral GetSelectAlunos()
        {
            var where = @"
                C_Perfil = 'A'
                AND LOWER(S_Nome) LIKE (
                    SELECT GROUP_CONCAT('%', LOWER(@Input_Nome), '%')
                )
                AND LOWER(S_RA) LIKE (
                    SELECT GROUP_CONCAT('%', LOWER(@Input_RA), '%')
                )";

            return new QueryCodeLiteral {
                QueryName = "selectAlunos.sql",
                QueryContent = @$"
                    SELECT COUNT(DISTINCT(u.I_Cod_Usuario)) FROM Usuario u WHERE {where};

                    SELECT
                        I_Cod_Usuario AS Key,
                        @_DescriptionColumn AS Description,
                        S_Nome,
                        S_RA
                    FROM Usuario WHERE {where}
                    LIMIT @_take;
                ",
                DefaultParameters = new Dictionary<string, object?>
                {
                    ["@Input_Nome"] = "",
                    ["@Input_RA"] = "",
                    ["@_take"] = 20
                }
            };
        }
        public static QueryCodeLiteral GetSelectCursos()
        {
            var where = @"
                LOWER(S_Nome) LIKE (
                    SELECT GROUP_CONCAT('%', LOWER(@Input_Nome), '%')
                )";
            
            return new QueryCodeLiteral {
                QueryName = "selectCursos.sql",
                QueryContent = @$"
                    SELECT COUNT(DISTINCT(c.I_Cod_Curso)) FROM Curso c WHERE {where};

                    SELECT
                        I_Cod_Curso AS Key,
                        @_DescriptionColumn AS Description,
                        S_Nome
                    FROM Curso WHERE {where}
                    LIMIT @_take;
                ",
                DefaultParameters = new Dictionary<string, object?>
                {
                    ["@Input_Nome"] = "",
                    ["@_take"] = 20
                }
            };
        }
    }
}