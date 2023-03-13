USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Usuario_Aluno = 3;
SET @Cod_Curso = 1;
SET @Data_Inicio = '2023-02-08';
SET @Data_Fim = NULL;

--Execução
INSERT INTO Inscricao_Curso
  (I_Cod_Usuario_Aluno, I_Cod_Curso, D_Data_Inicio, D_Data_Fim)
VALUES
(@Cod_Usuario_Aluno, @Cod_Curso, @Data_Inicio, @Data_Fim);