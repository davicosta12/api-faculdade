USE db_Faculdade;

--Variáveis
SET @Perfil = 'S';
SET @Ordenacao_Por = '';
SET @E_Ordenacao_Crescente = 1;
SET @Page = 1;

--Execução
SET @Results_Skipped = (@Page - 1) * 10;
SET @Desc_Text = IF(@E_Ordenacao_Crescente = 1, '', ' DESC');
PREPARE STMT FROM 
  CONCAT(CONCAT('
  SELECT I_Cod_Usuario, C_Perfil, S_Nome, S_RA, C_Sexo,
    S_Nome_Mae, B_E_Ativo FROM Usuario
  WHERE C_Perfil = @Perfil
  ORDER BY (CASE @Ordenacao_Por
    WHEN '''' THEN 1
    WHEN ''S_Nome'' THEN S_Nome
    WHEN ''S_RA'' THEN S_RA
    WHEN ''C_Sexo'' THEN C_Sexo
    WHEN ''S_Nome_Mae'' THEN S_Nome_Mae
    WHEN ''B_E_Ativo'' THEN B_E_Ativo
    END
  )', @Desc_Text), ' LIMIT 10 OFFSET ?');

EXECUTE STMT USING @Results_Skipped;