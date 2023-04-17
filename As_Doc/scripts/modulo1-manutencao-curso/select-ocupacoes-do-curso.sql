USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Curso = 4;

--Execução
SELECT I_Cod_Curso FROM Ocupacao
WHERE I_Cod_Curso = @Cod_Curso;