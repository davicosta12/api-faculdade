USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Curso = 1;

--Execução
SELECT I_Cod_Curso, S_Nome, S_Descricao
FROM Curso
WHERE I_Cod_Curso = @Cod_Curso;