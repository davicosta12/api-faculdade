USE db_Faculdade;

CREATE TABLE IF NOT EXISTS Configuracao (
  I_Cod_Configuracao INT PRIMARY KEY AUTO_INCREMENT,
  I_Minimo_Alunos INT,
  I_Maximo_Alunos INT,
  I_Duracao_Meses_Temporada INT
);
INSERT INTO Configuracao (I_Minimo_Alunos, I_Maximo_Alunos, I_Duracao_Meses_Temporada)
  VALUES (5, 20, 6);
CREATE TABLE IF NOT EXISTS Configuracao_De_Periodo (
  I_Cod_Configuracao_De_Periodo INT PRIMARY KEY AUTO_INCREMENT,
  S_Nome VARCHAR(100),
  C_Sigla VARCHAR(1),
  D_Hora_Inicio DATETIME,
  D_Hora_Fim DATETIME,
  B_E_Hora_Fim_No_Dia_Seguinte TINYINT
);

CREATE TABLE IF NOT EXISTS Usuario (
  I_Cod_Usuario INT PRIMARY KEY AUTO_INCREMENT,
  C_Perfil VARCHAR(1),
  S_CPF VARCHAR(11),
  S_Email VARCHAR(80),
  S_Nome VARCHAR(100),
  S_Senha VARCHAR(512),
  B_Tem_Senha_Temporaria TINYINT
);

CREATE TABLE IF NOT EXISTS Curso (
  I_Cod_Curso INT PRIMARY KEY AUTO_INCREMENT,
  S_Nome VARCHAR(100),
  S_Descricao VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS Ocupacao (
  I_Cod_Ocupacao INT PRIMARY KEY AUTO_INCREMENT,
  I_Cod_Usuario_Professor INT NOT NULL,
  I_Cod_Curso INT NOT NULL,
  S_Dia_Semana VARCHAR(3),
  D_Hora_Inicio DATETIME,
  D_Hora_Fim DATETIME,
  CONSTRAINT fk_Ocupacao_Cod_Usuario_Professor
    FOREIGN KEY(I_Cod_Usuario_Professor)
    REFERENCES Usuario (I_Cod_Usuario),
  CONSTRAINT fk_Ocupacao_Cod_Curso
    FOREIGN KEY(I_Cod_Curso)
    REFERENCES Curso (I_Cod_Curso)
);

CREATE TABLE IF NOT EXISTS Turma (
  I_Cod_Turma INT PRIMARY KEY AUTO_INCREMENT,
  I_Cod_Usuario_Professor INT NOT NULL,
  I_Cod_Curso INT NOT NULL,
  S_Dia_Semana VARCHAR(3),
  D_Hora_Inicio DATETIME,
  D_Hora_Fim DATETIME,
  I_Maximo_Alunos INT NOT NULL,
  D_Ultimo_Dia_Matricula DATETIME,
  D_Dia_Primeira_Aula DATETIME,
  D_Dia_Ultima_Aula DATETIME,
  F_Preco_Matricula DECIMAL(5, 2),
  CONSTRAINT fk_Turma_Cod_Usuario_Professor
    FOREIGN KEY(I_Cod_Usuario_Professor)
    REFERENCES Usuario (I_Cod_Usuario),
  CONSTRAINT fk_Turma_Cod_Curso
    FOREIGN KEY(I_Cod_Curso)
    REFERENCES Curso (I_Cod_Curso)
);

CREATE TABLE IF NOT EXISTS Matricula (
  I_Cod_Matricula INT PRIMARY KEY AUTO_INCREMENT,
  I_Cod_Usuario_Aluno INT NOT NULL,
  I_Cod_Turma INT NOT NULL,
  B_Lancou_Media TINYINT,
  F_Media DECIMAL(4, 2),
  CONSTRAINT fk_Matricula_Cod_Usuario_Aluno
    FOREIGN KEY(I_Cod_Usuario_Aluno)
    REFERENCES Usuario (I_Cod_Usuario),
  CONSTRAINT fk_Matricula_Cod_Turma
    FOREIGN KEY(I_Cod_Turma)
    REFERENCES Turma (I_Cod_Turma)
);