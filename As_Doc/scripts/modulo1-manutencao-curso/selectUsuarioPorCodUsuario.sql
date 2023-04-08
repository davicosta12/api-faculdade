USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Usuario = 1;

--Execução
SELECT I_Cod_Usuario, C_Perfil, S_Nome FROM Usuario
WHERE I_Cod_Usuario = @Cod_Usuario;