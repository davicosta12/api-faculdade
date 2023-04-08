USE db_Faculdade;

--Parâmetros de Entrada
SET @Cod_Usuario_Aluno = 4;

--Execução
SELECT I_Cod_Inscricao_Curso
FROM Inscricao_Curso
WHERE I_Cod_Usuario_Aluno = @Cod_Usuario_Aluno;