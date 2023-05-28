namespace Dev_Backend.Maqui.Data.CodeLiteral
{

    public static class CoursesQueryCodeLiteralMaker
    {
        public static QueryCodeLiteral GetSelectPeriodos()
        {
            var where = @"
                LOWER(S_Nome) LIKE (
                    SELECT GROUP_CONCAT('%', LOWER(@Input_Nome), '%')
                )
                AND (@I_Cod IS NULL OR I_Cod_Configuracao_De_Periodo = @I_Cod)";

            return new QueryCodeLiteral {
                QueryName = "selectPeriodosNoCurso.sql",
                QueryContent = @$"
                    SELECT COUNT(DISTINCT(I_Cod_Configuracao_De_Periodo)) FROM Configuracao_De_Periodo WHERE {where};

                    SELECT
                        I_Cod_Configuracao_De_Periodo AS Cod,
                        ^DescriptionColumn AS Description,
                        S_Nome
                    FROM Configuracao_De_Periodo WHERE {where}
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
        public static QueryCodeLiteral GetSelectAlunos()
        {
            var where = @"
                LOWER(S_CPF) LIKE (
                    SELECT GROUP_CONCAT('%', LOWER(@Input_CPF), '%')
                )
                AND LOWER(S_Email) LIKE (
                    SELECT GROUP_CONCAT('%', LOWER(@Input_Email), '%')
                )
                AND LOWER(S_Nome) LIKE (
                    SELECT GROUP_CONCAT('%', LOWER(@Input_Nome), '%')
                )
                AND (@I_Cod IS NULL OR I_Cod_Aluno = @I_Cod)";

            return new QueryCodeLiteral {
                QueryName = "selectAlunosNoCurso.sql",
                QueryContent = @$"
                    SELECT COUNT(DISTINCT(I_Cod_Aluno)) FROM Aluno WHERE {where};

                    SELECT
                        I_Cod_Aluno AS Cod,
                        ^DescriptionColumn AS Description,
                        S_CPF,
                        S_Email,
                        S_Nome
                    FROM Aluno WHERE {where}
                    LIMIT @_take;
                ",
                DefaultParameters = new Dictionary<string, object?>
                {
                    ["@Input_CPF"] = "",
                    ["@Input_Email"] = "",
                    ["@Input_Nome"] = "",
                    ["@I_Cod"] = null,
                    ["@_take"] = 20
                }
            };
        }
    }
}