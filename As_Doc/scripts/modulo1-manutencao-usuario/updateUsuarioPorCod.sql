USE db_Faculdade;

--Parâmetros de entrada
SET @Cod_Usuario = 3;
SET @Nome = 'Roghério com H';
SET @CPF = '00000000949';
SET @RA = '00000949';
SET @Sigla_Sexo = 'M';
SET @Nome_Mae = 'AAAXXX';
SET @E_Ativo = 1;
SET @Email = 'rogerio@skylab';
SET @Senha = 'rogerio1';

--Execução
SET @Senha_Hashada = IF(
  @Senha <> '', 
  SHA2(@Senha, 512), 
  (SELECT S_Senha FROM Usuario
    WHERE I_Cod_Usuario = @Cod_Usuario)
  );
UPDATE Usuario SET
  S_Nome = @Nome,
  S_CPF = @CPF,
  S_RA = @RA,
  C_Sexo = @Sigla_Sexo,
  S_Nome_Mae = @Nome_Mae,
  B_E_Ativo = @E_Ativo,
  S_Email = @Email,
  S_Senha = @Senha_Hashada,
  B_Tem_Senha_Temporaria = 1
WHERE I_Cod_Usuario = @Cod_Usuario;
