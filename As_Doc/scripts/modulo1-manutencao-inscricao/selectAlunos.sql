USE db_Faculdade;

--Parâmetros de entrada
SET @Input_Nome = '';
SET @Input_RA = '';

--Execução
SELECT I_Cod_Usuario, S_Nome, S_RA FROM Usuario
WHERE C_Perfil = 'A'
  AND LOWER(S_Nome) LIKE (
    SELECT GROUP_CONCAT('%', LOWER(@Input_Nome), '%')
  )
  AND LOWER(S_RA) LIKE (
    SELECT GROUP_CONCAT('%', LOWER(@Input_RA), '%')
  )
LIMIT 20;