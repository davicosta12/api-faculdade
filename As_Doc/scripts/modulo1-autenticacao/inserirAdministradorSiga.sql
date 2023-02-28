USE db_Faculdade;

SET @Senha_Hashada = SHA2('admin007', 512);
INSERT INTO Usuario (C_Perfil, S_Nome, S_CPF, S_RA, C_Sexo,
  S_Nome_Mae, B_E_Ativo, S_Email, S_Senha, B_Tem_Senha_Temporaria)
VALUES
('S', 'Administrador do SIGA++', '00000000191', '', 'M', '', 1,
  'administrador@sigamm.br', @Senha_Hashada, 0);
