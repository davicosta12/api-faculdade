USE db_Faculdade;

--Parâmetros de entrada
SET @Input_Nome = 'Re';

--Execução
SELECT I_Cod_Curso, S_Nome FROM Curso
WHERE LOWER(S_Nome) LIKE (
  SELECT GROUP_CONCAT('%', LOWER(@Input_Nome), '%')
)
LIMIT 20;