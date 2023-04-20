USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Ocupacao = 2;
SET @I_Cod_Usuario_Professor = 4;
SET @I_Cod_Curso = 2;
SET @Sigla_Dia_Semana = 'SAB';
SET @Hora_Inicio = '2023-01-01 19:00:00';
SET @Hora_Fim = '2023-01-01 20:40:00';

--Execução
UPDATE Ocupacao SET
  I_Cod_Usuario_Professor = @I_Cod_Usuario_Professor,
  I_Cod_Curso = @I_Cod_Curso,
  S_Dia_Semana = @Sigla_Dia_Semana,
  D_Hora_Inicio = @Hora_Inicio,
  D_Hora_Fim = @Hora_Fim
WHERE I_Cod_Ocupacao = @Cod_Ocupacao;
