USE db_Faculdade;

--Parâmetros de Entrada
SET @Cod_Inscricao_Curso = 2;

--Execução
DELETE FROM Inscricao_Curso
WHERE I_Cod_Inscricao_Curso = @Cod_Inscricao_Curso;