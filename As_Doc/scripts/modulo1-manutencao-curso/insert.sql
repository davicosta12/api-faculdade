USE db_Faculdade;

--Parâmetros de entrada
SET @Nome = 'SQL';
SET @Descricao = 'SQL do básico ao intermediário\n\nCarga horária total: 40 horas\nTópicos abordados:\n- Preparação do ambiente\n- Teoria de DDL e DML';

--Execução
INSERT INTO Curso (S_Nome, S_Descricao)
VALUES (@Nome, @Descricao);