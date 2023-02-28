USE db_Faculdade;

--Variáveis
SET @Cod_Usuario = 1;
SET @Senha = 'admin007';

--Execução
SET @Senha_Hashada = SHA2(@Senha, 512);
UPDATE Usuario SET
  B_Tem_Senha_Temporaria = 0,
  S_Senha = @Senha_Hashada
WHERE I_Cod_Usuario = @Cod_Usuario;
