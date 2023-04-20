USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Usuario_Logado = 1;

--Execução
SELECT I_Cod_Usuario, C_Perfil FROM Usuario
WHERE I_Cod_Usuario = @Cod_Usuario_Logado;