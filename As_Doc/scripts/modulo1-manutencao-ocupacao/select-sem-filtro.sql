USE db_Faculdade;

--Parâmetros de entrada
SET @Ordenacao_Por = '';
SET @E_Ordenacao_Crescente = 1;
SET @Page = 1;

--Execução
SET @Results_Skipped = (@Page - 1) * 10;
SET @Desc_Text = IF(@E_Ordenacao_Crescente = 1, '', ' DESC');
PREPARE STMT FROM 
  CONCAT(CONCAT('
  SELECT o.I_Cod_Ocupacao, o.I_Cod_Usuario_Professor,
    o.I_Cod_Curso, o.S_Dia_Semana, o.D_Hora_Inicio,
    o.D_Hora_Fim, p.S_Nome as ProfesorS_Nome,
    c.S_Nome as CursoS_Nome
  FROM Ocupacao o
    INNER JOIN Usuario p
      ON p.I_Cod_Usuario = o.I_Cod_Usuario_Professor
    INNER JOIN Curso c
      ON c.I_Cod_Curso = o.I_Cod_Curso
  ORDER BY (CASE @Ordenacao_Por
    WHEN '''' THEN 1
    WHEN ''ProfesorS_Nome'' THEN ProfesorS_Nome
    WHEN ''CursoS_Nome'' THEN CursoS_Nome
    WHEN ''S_Dia_Semana'' THEN S_Dia_Semana
    WHEN ''D_Hora_Inicio'' THEN D_Hora_Inicio
    WHEN ''D_Hora_Fim'' THEN D_Hora_Fim
    END
  )', @Desc_Text), ' LIMIT 10 OFFSET ?');

EXECUTE STMT USING @Results_Skipped;