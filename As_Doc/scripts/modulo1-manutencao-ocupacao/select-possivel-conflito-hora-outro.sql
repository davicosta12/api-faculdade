USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Usuario_Professor = 4;
SET @Sigla_Dia_Semana = 'SEG';
SET @Hora_Inicio = '2023-01-01 16:00:00';
SET @Hora_Fim = '2023-01-01 16:30:00';
SET @Cod_Ocupacao_Ignorada = 2;

--Execução
SET @Minutos_Dia_Semana = 
  (CASE @Sigla_Dia_Semana
    WHEN 'DOM' THEN 0
    WHEN 'SEG' THEN 1
    WHEN 'TER' THEN 2
    WHEN 'QUA' THEN 3
    WHEN 'QUI' THEN 4
    WHEN 'SEX' THEN 5
    WHEN 'SAB' THEN 6
    END) * 24 * 60;
SET @Minutos_Inicio = @Minutos_Dia_Semana +
  HOUR(@Hora_Inicio) * 60 + MINUTE(@Hora_Inicio);
SET @Minutos_Fim =  @Minutos_Dia_Semana +
  HOUR(@Hora_Fim) * 60 + MINUTE(@Hora_Fim);

SELECT I_Cod_Ocupacao, I_Cod_Usuario_Professor, S_Dia_Semana,
  D_Hora_Inicio, D_Hora_Fim, Minutos_Inicio, Minutos_Fim FROM (
SELECT I_Cod_Ocupacao, I_Cod_Usuario_Professor, S_Dia_Semana,
  D_Hora_Inicio, D_Hora_Fim, 
  ( (CASE S_Dia_Semana
    WHEN 'DOM' THEN 0
    WHEN 'SEG' THEN 1
    WHEN 'TER' THEN 2
    WHEN 'QUA' THEN 3
    WHEN 'QUI' THEN 4
    WHEN 'SEX' THEN 5
    WHEN 'SAB' THEN 6
    END) * 24 * 60 +
    HOUR(D_Hora_Inicio) * 60 + MINUTE(D_Hora_Inicio)
  ) AS Minutos_Inicio,
  ( (CASE S_Dia_Semana
    WHEN 'DOM' THEN 0
    WHEN 'SEG' THEN 1
    WHEN 'TER' THEN 2
    WHEN 'QUA' THEN 3
    WHEN 'QUI' THEN 4
    WHEN 'SEX' THEN 5
    WHEN 'SAB' THEN 6
    END) * 24 * 60 +
    HOUR(D_Hora_Fim) * 60 + MINUTE(D_Hora_Fim)
  ) AS Minutos_Fim
FROM Ocupacao
WHERE I_Cod_Usuario_Professor = @Cod_Usuario_Professor
  AND I_Cod_Ocupacao <> @Cod_Ocupacao_Ignorada
) sq
WHERE 
  (@Minutos_Inicio BETWEEN sq.Minutos_Inicio AND sq.Minutos_Fim)
  OR (@Minutos_Fim BETWEEN sq.Minutos_Inicio AND sq.Minutos_Fim)
  OR (sq.Minutos_Inicio BETWEEN @Minutos_Inicio AND @Minutos_Fim)
  OR (sq.Minutos_Fim BETWEEN @Minutos_Inicio AND @Minutos_Fim);