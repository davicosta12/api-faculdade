USE db_Faculdade;

--Parâmetros de entrada
SET @Perfil = 'S';
SET @Termos = '';
SET @E_Avancada = 1;
SET @Tem_Avancado_Nome = 1;
SET @Avancado_Nome = 'Gi';
SET @Tem_Avancado_RA = 0;
SET @Avancado_RA = '';
SET @Tem_Avancado_Sexo = 0;
SET @Avancado_Sexo = '';
SET @Tem_Avancado_Nome_Mae = 0;
SET @Avancado_Nome_Mae = '';
SET @Tem_Avancado_E_Ativo = 0;
SET @Avancado_E_Ativo = 0;
SET @Ordenacao_Por = 'Nome';
SET @E_Ordenacao_Crescente = 1;
SET @Page = 1;
SET @Results_Per_Page = 10;

--Pre Procedure
DELIMITER //
CREATE OR REPLACE FUNCTION fn_Item_Na_Posicao_String_Split (
  Text VARCHAR(2000),
  Split_Char VARCHAR(1),
  Item_Position INT
) RETURNS VARCHAR(2000) BEGIN
  DECLARE Previous_Text, Position_Text  VARCHAR(2000);
  DECLARE Raw_Text VARCHAR(2000); 
  IF Item_Position = 1 THEN
    RETURN SUBSTRING_INDEX(Text, Split_Char, 1);
  END IF;
  SET Previous_Text = SUBSTRING_INDEX(Text, Split_Char, Item_Position - 1);
  SET Position_Text = SUBSTRING_INDEX(Text, Split_Char, Item_Position);
  IF LENGTH(Previous_Text) = LENGTH(Position_Text) THEN
    RETURN NULL;
  END IF;
  SET Raw_Text = SUBSTRING(Position_Text, LENGTH(Previous_Text) + 1);
  RETURN REPLACE(Raw_Text, Split_Char, '');
END;
//
DELIMITER ;

DELIMITER //
CREATE OR REPLACE PROCEDURE sp_Montar_Where_Usuario_Avancado (
  OUT Where_Text VARCHAR(2000)
) BEGIN
  SET @Mounted_Text = '';
  IF @E_Avancada = 1 THEN
    IF @Tem_Avancado_Nome = 1 AND @Avancado_Nome <> '' THEN
      SET @Mounted_Text = CONCAT(@Mounted_Text, ' AND INSTR(LOWER(S_Nome), LOWER(''@Avancado_Nome''))');
    END IF;
    IF @Tem_Avancado_RA = 1 AND @Avancado_RA <> '' THEN
      SET @Mounted_Text = CONCAT(@Mounted_Text, ' AND INSTR(LOWER(S_RA), LOWER(''@Avancado_RA'''))');
    END IF;
    IF @Tem_Avancado_Sexo = 1 AND @Avancado_Sexo <> '' THEN
      SET @Mounted_Text = CONCAT(@Mounted_Text, ' AND C_Sexo = ''@Avancado_Sexo''');
    END IF;
    IF @Tem_Avancado_Nome_Mae = 1 AND @Avancado_Nome_Mae <> '' THEN
      SET @Mounted_Text = CONCAT(@Mounted_Text, ' AND INSTR(LOWER(S_Nome_Mae), LOWER(''@Avancado_Nome_Mae'''))');
    END IF;
    IF @Tem_Avancado_E_Ativo = 1 AND @Avancado_E_Ativo <> '' THEN
      SET @Mounted_Text = CONCAT(@Mounted_Text, ' AND B_E_Ativo = @Avancado_E_Ativo');
    END IF;
  ELSE
    SET @Current_Index = 1;
    LOOP
      SET @Text_At_Position = fn_Item_Na_Posicao_String_Split(@Termos, ' ', @Current_Index);
      IF @Text_At_Position = NULL THEN
        LEAVE;
      END IF;
      IF @Text_At_Position = '' THEN
        ITERATE;
      END IF;
      SET @Mounted_Text = CONCAT(@Mounted_Text, ' AND (
        INSTR(LOWER(S_Nome), LOWER(''@Text_At_Position''))
        OR INSTR(LOWER(S_RA), LOWER(''@Text_At_Position''))
        OR INSTR(C_Sexo, ''@Text_At_Position'')
        OR INSTR(S_Nome_Mae, LOWER(''@Text_At_Position''))
        )');
      SET @Current_Index = @Current_Index + 1;
    END LOOP;
  END IF;
  SELECT @Mounted_Text INTO Where_Text;
END;
//
DELIMITER ;

--Procedure
DELIMITER //
CREATE OR REPLACE PROCEDURE sp_Select_Usuario_Com_Filtros () BEGIN
  SET @Stmt_Text = '
    SELECT I_Cod_Usuario, C_Perfil, S_Nome, S_RA, C_Sexo,
      S_Nome_Mae, B_E_Ativo FROM Usuario
      WHERE C_Perfil = @Perfil
    ';
    
  IF @Termos <> '' OR @E_Avancada = 1 THEN
    CALL sp_Montar_Where_Usuario_Avancado(@Where_Text);
    SET @Stmt_Text = CONCAT(@Stmt_Text, @Where_Text);
  END IF;
  SET @Stmt_Text = CONCAT(@Stmt_Text, ' ORDER BY ');
  
  SET @Stmt_Text = CONCAT(@Stmt_Text,
    IF(@Ordenacao_Por = '', '1', '''@OrdenacaoPor'''));
  IF @E_Ordenacao_Crescente = 0 THEN
    SET @Stmt_Text = CONCAT(@Stmt_Text, ' DESC');
  END IF;
  
  SET @Stmt_Text = CONCAT(@Stmt_Text, ' LIMIT ');
  SET @Stmt_Text = CONCAT(@Stmt_Text, CAST(
    @Results_Per_Page AS VARCHAR(10)
    ));
  SET @Stmt_Text = CONCAT(@Stmt_Text, ', ');
  SET @Stmt_Text = CONCAT(@Stmt_Text, CAST(
    ((@Page - 1) * @Results_Per_Page) AS VARCHAR(10)
    ));
  PREPARE STMT FROM @Stmt_Text;
  EXECUTE STMT;
END;
//
DELIMITER ;

--Execução
CALL sp_Select_Com_Filtros();
