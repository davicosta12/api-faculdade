USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Curso = 1;
SET @Nome = 'Tecnologia de Sistemas';
SET @Limite_Semestres = 12;

--Execução
UPDATE Curso SET
  I_Cod_Curso = @Cod_Curso,
  S_Nome = @Nome,
  I_Qtd_Limite_Semestres = @Limite_Semestres
WHERE I_Cod_Curso = @Cod_Curso;
