USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Curso = 4;

--Execução
SELECT I_Cod_Inscricao_Curso FROM Inscricao_Curso
WHERE I_Cod_Curso = @Cod_Curso;