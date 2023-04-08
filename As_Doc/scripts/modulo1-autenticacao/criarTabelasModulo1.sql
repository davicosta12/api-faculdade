USE db_Faculdade;

CREATE TABLE IF NOT EXISTS Usuario (
  I_Cod_Usuario INT PRIMARY KEY AUTO_INCREMENT,
  C_Perfil VARCHAR(1),
  S_Nome VARCHAR(100),
  S_CPF VARCHAR(11),
  S_RA VARCHAR(8),
  C_Sexo VARCHAR(1),
  S_Nome_Mae VARCHAR(100),
  B_E_Ativo TINYINT,
  S_Email VARCHAR(80),
  S_Senha VARCHAR(512),
  B_Tem_Senha_Temporaria TINYINT
);

CREATE TABLE IF NOT EXISTS Curso (
  I_Cod_Curso INT PRIMARY KEY AUTO_INCREMENT,
  S_Nome VARCHAR(60),
  I_Qtd_Limite_Semestres SMALLINT
);

CREATE TABLE IF NOT EXISTS Inscricao_Curso (
  I_Cod_Inscricao_Curso INT PRIMARY KEY AUTO_INCREMENT,
  I_Cod_Usuario_Aluno INT NOT NULL,
  I_Cod_Curso INT NOT NULL,
  D_Data_Inicio DATETIME,
  D_Data_Fim DATETIME NULL,
  CONSTRAINT fk_Inscricao_Curso_Cod_Usuario_Aluno
    FOREIGN KEY(I_Cod_Usuario_Aluno)
    REFERENCES Usuario (I_Cod_Usuario),
  CONSTRAINT fk_Inscricao_Curso_Cod_Curso
    FOREIGN KEY(I_Cod_Curso)
    REFERENCES Curso (I_Cod_Curso)
);
