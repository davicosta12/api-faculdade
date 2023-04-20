USE db_Faculdade;

--Parâmetros de entrada
SET @I_Cod_Usuario_Professor = 4;
SET @I_Cod_Curso = 2;
SET @Sigla_Dia_Semana = 'SAB';
SET @Hora_Inicio = '2023-01-01 19:00:00';
SET @Hora_Fim = '2023-01-01 20:45:00';

--Execução
INSERT INTO Ocupacao (I_Cod_Usuario_Professor, I_Cod_Curso,
  S_Dia_Semana, D_Hora_Inicio, D_Hora_Fim)
VALUES (@I_Cod_Usuario_Professor, @I_Cod_Curso,
  @Sigla_Dia_Semana, @Hora_Inicio, @Hora_Fim);