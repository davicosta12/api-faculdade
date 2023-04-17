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
  SELECT I_Cod_Curso, S_Nome
    FROM Curso
  ORDER BY (CASE @Ordenacao_Por
    WHEN '''' THEN 1
    WHEN ''S_Nome'' THEN S_Nome
    END
  )', @Desc_Text), ' LIMIT 10 OFFSET ?');

EXECUTE STMT USING @Results_Skipped;