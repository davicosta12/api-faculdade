USE db_Faculdade;

--Parâmetros de entrada
SET @CPF = '00000000191';
SET @RA = '00000191';
SET @Email = 'bill@gates';

--Execução
SELECT I_Cod_Usuario, C_Perfil, S_CPF, S_RA, S_Email
FROM Usuario
WHERE (
  (@CPF <> '' AND S_CPF = @CPF)
  OR (@RA <> '' AND S_RA = @RA)
  OR (@Email <> '' AND S_Email = @Email)
);
