USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Curso = 1;
SET @Nome = 'Tecnologia de Sistemas';
SET @Descricao = 'SQL do básico ao intermediário\n\nCarga horária total: 40 horas\nTópicos abordados:\n- Preparação do ambiente\n- Teoria de DDL e DML';

--Execução
UPDATE Curso SET
  S_Nome = @Nome,
  S_Descricao = @Descricao
WHERE I_Cod_Curso = @Cod_Curso;