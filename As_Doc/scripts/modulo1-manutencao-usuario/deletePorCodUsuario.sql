USE db_Faculdade;

--Parâmetros de Entrada
SET @Cod_Usuario = 2;

--Execução
DELETE FROM Usuario
WHERE I_Cod_Usuario = @Cod_Usuario;