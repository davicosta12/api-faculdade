USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Curso = 2;

--Execução
DELETE FROM Curso
WHERE I_Cod_Curso = @Cod_Curso;