USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Ocupacao = 1;

--Execução
SELECT I_Cod_Ocupacao, I_Cod_Usuario_Professor,
  I_Cod_Curso, S_Dia_Semana, D_Hora_Inicio, D_Hora_Fim
FROM Ocupacao
WHERE I_Cod_Ocupacao = @Cod_Ocupacao;