USE db_Faculdade;

--Parâmetros de entrada
SET @CPF = '00000000191';
SET @Senha = 'admin007';

--Execução
SET @Senha_Hashada = SHA2(@Senha, 512);
SELECT I_Cod_Usuario, C_Perfil, S_Nome, S_CPF, S_Senha,
  B_E_Ativo, B_Tem_Senha_Temporaria FROM Usuario
WHERE S_CPF = @CPF AND S_Senha = @Senha_Hashada;