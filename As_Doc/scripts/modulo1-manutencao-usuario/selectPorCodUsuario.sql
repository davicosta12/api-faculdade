USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Usuario = 1;

--Execução
SELECT I_Cod_Usuario, C_Perfil, S_Nome, S_CPF, S_RA, C_Sexo,
  S_Nome_Mae, B_E_Ativo, S_Email, S_Senha, B_Tem_Senha_Temporaria
FROM Usuario
WHERE I_Cod_Usuario = @Cod_Usuario;