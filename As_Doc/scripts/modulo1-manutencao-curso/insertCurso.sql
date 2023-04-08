USE db_Faculdade;

--Parâmetros de entrada
SET @Nome = 'Tecnologia de Farmácia';
SET @Limite_Semetres = 10;

--Execução
INSERT INTO Curso (S_Nome, I_Qtd_Limite_Semestres)
VALUES (@Nome, @Limite_Semetres);