
CREATE DATABASE Magistra;


USE Magistra;


CREATE TABLE Mahasiswa (
    NIM VARCHAR(15) NOT NULL,
    Nama VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    No_Hp VARCHAR(15),
    Alamat TEXT,
    Angkatan INT,
    Status VARCHAR(20),
    PRIMARY KEY (NIM, Email),
    UNIQUE (Email) 
);

CREATE TABLE Account (
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    PRIMARY KEY (Username),
    FOREIGN KEY (Email) REFERENCES Mahasiswa(Email)
);


INSERT INTO Mahasiswa (NIM, Nama, Email, No_Hp, Alamat, Angkatan, Status) VALUES
('24060122140140', 'Daffa Aly Meganendra', 'daffa.aly@example.com', '081234567890', 'Jl. Merdeka No. 1', 2022, 'Aktif'),
('24060122140184', 'Raden Rico Dwianda', 'raden.rico@example.com', '081234567891', 'Jl. Pancasila No. 2', 2022, 'Aktif'),
('24060122120028', 'Sherli Arninda', 'sherli.arninda@example.com', '081234567892', 'Jl. Bhinneka No. 3', 2022, 'Aktif'),
('24060122130092', 'Sausan Berliana Arriqzi', 'sausan.berliana@example.com', '081234567893', 'Jl. Tunggal Ika No. 4', 2022, 'Aktif');


INSERT INTO Account (Username, Password, Email) VALUES
('daffaaly', 'daffaaly140', 'daffa.aly@example.com'),
('radenrico', 'radenrico184', 'raden.rico@example.com'),
('sherliarninda', 'sherliarninda028', 'sherli.arninda@example.com'),
('sausanberliana', 'sausanberliana092', 'sausan.berliana@example.com');


