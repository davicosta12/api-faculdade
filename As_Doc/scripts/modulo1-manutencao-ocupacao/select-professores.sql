USE db_Faculdade;

--Parâmetros de entrada
SET @Input_Nome = 'Ma';

--Execução
SELECT I_Cod_Usuario, C_Perfil, S_Nome
FROM Usuario
WHERE C_Perfil = 'P'
  AND LOWER(S_Nome) LIKE (
    SELECT GROUP_CONCAT('%', LOWER(@Input_Nome), '%')
  )
LIMIT 20;