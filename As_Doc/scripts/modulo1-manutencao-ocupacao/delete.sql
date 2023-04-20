USE db_Faculdade;

--Parâmetros de Entrada
SET @Cod_Ocupacao = 2;

--Execução
DELETE FROM Ocupacao
WHERE I_Cod_Ocupacao = @Cod_Ocupacao;