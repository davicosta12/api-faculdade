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
  SELECT
    Inscricao_Curso.I_Cod_Inscricao_Curso,
    Usuario.S_Nome AS Nome_Aluno,
    Usuario.S_RA AS RA_Aluno,
    Curso.S_Nome AS Nome_Curso,
    Inscricao_Curso.D_Data_Inicio
  FROM Inscricao_Curso
    INNER JOIN Usuario ON Usuario.I_Cod_Usuario =
      Inscricao_Curso.I_Cod_Usuario_Aluno
    INNER JOIN Curso ON Curso.I_Cod_Curso = 
      Inscricao_Curso.I_Cod_Curso
  ORDER BY (CASE @Ordenacao_Por
    WHEN '''' THEN 1
    WHEN ''Nome_Aluno'' THEN Nome_Aluno
    WHEN ''RA_Aluno'' THEN RA_Aluno
    WHEN ''Nome_Curso'' THEN Nome_Curso
    WHEN ''D_Data_Inicio'' THEN Inscricao_Curso.D_Data_Inicio
    END
  )', @Desc_Text), ' LIMIT 10 OFFSET ?');

EXECUTE STMT USING @Results_Skipped;