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

CREATE TABLE IF NOT EXISTS Curso (
  I_Cod_Curso INT PRIMARY KEY AUTO_INCREMENT,
  S_Sequencial VARCHAR(2),
  S_Nome VARCHAR(100),
  F_Valor DECIMAL(10,2),
  S_Pre_Cod VARCHAR(36)
);
CREATE TABLE IF NOT EXISTS Turma (
  I_Cod_Turma INT PRIMARY KEY AUTO_INCREMENT,
  I_Cod_Curso INT,
  S_Sequencial VARCHAR(4),
  I_Modalidade INT,
  I_Cod_Configuracao_De_Periodo INT NOT NULL,
  B_Esta_Pendente TINYINT,
  D_Data_Inicio DATETIME,
  D_Data_Fim DATETIME,
  S_Pre_Cod VARCHAR(36),
  S_Pre_Cod_Curso VARCHAR(36),
  CONSTRAINT fk_Turma_Cod_Curso
    FOREIGN KEY(I_Cod_Curso)
    REFERENCES Curso (I_Cod_Curso),
  CONSTRAINT fk_Horario_Cod_Configuracao_De_Periodo
    FOREIGN KEY(I_Cod_Configuracao_De_Periodo)
    REFERENCES Configuracao_De_Periodo
      (I_Cod_Configuracao_De_Periodo)
);
CREATE TABLE IF NOT EXISTS Horario (
  I_Cod_Horario INT PRIMARY KEY AUTO_INCREMENT,
  I_Cod_Turma INT,
  I_Dia_Da_Semana INT,
  D_Hora_Inicio DATETIME,
  D_Hora_Fim DATETIME,
  B_E_Hora_Fim_No_Dia_Seguinte TINYINT,
  S_Pre_Cod_Turma VARCHAR(36),
  CONSTRAINT fk_Horario_Cod_Turma
    FOREIGN KEY(I_Cod_Turma)
    REFERENCES Turma (I_Cod_Turma)
);
CREATE TABLE IF NOT EXISTS Aluno (
  I_Cod_Aluno INT PRIMARY KEY AUTO_INCREMENT,
  S_CPF VARCHAR(11),
  S_Email VARCHAR(80),
  S_Nome VARCHAR(100),
  S_Senha VARCHAR(512),
  B_Tem_Senha_Temporaria TINYINT,
  S_Pre_Cod VARCHAR(36)
);
CREATE TABLE IF NOT EXISTS Matricula (
  I_Cod_Matricula INT PRIMARY KEY AUTO_INCREMENT,
  I_Cod_Turma INT,
  I_Cod_Aluno INT,
  S_Sequencial_RA VARCHAR(10),
  S_Pre_Cod_Turma VARCHAR(36),
  S_Pre_Cod_Aluno VARCHAR(36),
  CONSTRAINT fk_Matricula_Cod_Turma
    FOREIGN KEY(I_Cod_Turma)
    REFERENCES Turma (I_Cod_Turma),
  CONSTRAINT fk_Matricula_Cod_Aluno
    FOREIGN KEY(I_Cod_Aluno)
    REFERENCES Aluno (I_Cod_Aluno)
);
INSERT INTO Aluno (S_CPF, S_Email, S_Nome, S_Senha,
  B_Tem_Senha_Temporaria)
  VALUES ('00000000191', 'leandro@accelerateschool.edu',
    'Leandro Alves', SHA2('LeandroSiga++1'), 0);