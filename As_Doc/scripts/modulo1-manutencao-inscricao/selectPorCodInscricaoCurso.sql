USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Inscricao_Curso = 1;

--Execução
SELECT I_Cod_Inscricao_Curso, I_Cod_Usuario_Aluno, I_Cod_Curso,
  D_Data_Inicio, D_Data_Fim
FROM Inscricao_Curso
WHERE I_Cod_Inscricao_Curso = @Cod_Inscricao_Curso;