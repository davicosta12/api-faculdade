USE db_Faculdade;

--Parâmetros de entrada
SET @Nome = 'Rogério';
SET @CPF = '00000000949';
SET @RA = '00000949';
SET @Sigla_Sexo = 'M';
SET @Nome_Mae = '';
SET @Email = 'rogerio@skylab';
SET @Senha = 'rogerio1';

--Execução
SET @Senha_Hashada = SHA2(@Senha, 512);
INSERT INTO Usuario (C_Perfil, S_Nome, S_CPF, S_RA, C_Sexo,
  S_Nome_Mae, B_E_Ativo, S_Email, S_Senha, B_Tem_Senha_Temporaria)
VALUES
('A', @Nome, @CPF, @RA, @Sigla_Sexo, @Nome_Mae, 1, @Email,
  @Senha_Hashada, 0);