USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Usuario_Professor = 4;

--Execução
SELECT I_Cod_Usuario_Professor FROM Ocupacao
WHERE I_Cod_Usuario_Professor = @Cod_Usuario_Professor;