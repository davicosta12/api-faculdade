USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Inscricao_Curso = 1;
SET @Cod_Usuario_Aluno = 3;
SET @Cod_Curso = 1;
SET @Data_Inicio = '2023-02-10';
SET @Data_Fim = NULL;

--Execução
UPDATE Inscricao_Curso SET
  I_Cod_Usuario_Aluno = @Cod_Usuario_Aluno,
  I_Cod_Curso = @Cod_Curso,
  D_Data_Inicio = @Data_Inicio,
  D_Data_Fim = @Data_Fim
WHERE I_Cod_Inscricao_Curso = @Cod_Inscricao_Curso;