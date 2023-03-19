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
                )
                AND (@I_Cod IS NULL OR I_Cod_Usuario = @I_Cod)";

            return new QueryCodeLiteral {
                QueryName = "selectAlunos.sql",
                QueryContent = @$"
                    SELECT COUNT(DISTINCT(I_Cod_Usuario)) FROM Usuario WHERE {where};

                    SELECT
                        I_Cod_Usuario AS Cod,
                        ^DescriptionColumn AS Description,
                        S_Nome,
                        S_RA
                    FROM Usuario WHERE {where}
                    LIMIT @_take;
                ",
                DefaultParameters = new Dictionary<string, object?>
                {
                    ["@Input_Nome"] = "",
                    ["@Input_RA"] = "",
                    ["@I_Cod"] = null,
                    ["@_take"] = 20
                }
            };
        }
        public static QueryCodeLiteral GetSelectCursos()
        {
            var where = @"
                LOWER(S_Nome) LIKE (
                    SELECT GROUP_CONCAT('%', LOWER(@Input_Nome), '%')
                )
                AND (@I_Cod IS NULL OR I_Cod_Curso = @I_Cod)";
            
            return new QueryCodeLiteral {
                QueryName = "selectCursos.sql",
                QueryContent = @$"
                    SELECT COUNT(DISTINCT(I_Cod_Curso)) FROM Curso WHERE {where};

                    SELECT
                        I_Cod_Curso AS Cod,
                        ^DescriptionColumn AS Description,
                        S_Nome
                    FROM Curso WHERE {where}
                    LIMIT @_take;
                ",
                DefaultParameters = new Dictionary<string, object?>
                {
                    ["@Input_Nome"] = "",
                    ["@I_Cod"] = null,
                    ["@_take"] = 20
                }
            };
        }
    }
}