-- os comandos SQL estão sendo gerenciados pelo TypeORM, 
-- mas aqui eu irei registrar os comandos "manuais" para criar as tabelas apenas para efeito de registro/documentação

-- revisar
CREATE TABLE Quimico (
  IDRecebimento INT PRIMARY KEY,
  produto VARCHAR(100) NOT NULL,
  peso DECIMAL(10, 2) NOT NULL,
  IDQuimico INT,
  FOREIGN KEY (IDQuimico) REFERENCES Quimicos(IDQuimico)
);

 -- revisar
CREATE TABLE Recebimento (
  IDRecebimento INT PRIMARY KEY,
  produto VARCHAR(100) NOT NULL,
  peso DECIMAL(10, 2) NOT NULL,
  IDQuimico INT,
  FOREIGN KEY (IDQuimico) REFERENCES Quimicos(IDQuimico)
);