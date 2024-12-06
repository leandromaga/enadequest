CREATE TABLE curso (
    int_cd_curso SERIAL PRIMARY KEY,
    chr_curso VARCHAR(100)
);

CREATE TABLE tipo_questao (
    int_cd_tipo_questao SERIAL PRIMARY KEY,
    chr_tipo_questao VARCHAR(100)
);

CREATE TABLE enunciado (
    int_cd_enunciado SERIAL PRIMARY KEY,
    chr_enunciado TEXT
);

CREATE TABLE prova (
    int_cd_prova SERIAL PRIMARY KEY,
    int_cd_curso INT NOT NULL,
    dat_dt_ano_aplicacao VARCHAR(4),
    CONSTRAINT fk_curso FOREIGN KEY (int_cd_curso) REFERENCES CURSO(int_cd_curso)
);

CREATE TABLE questao (
    int_cd_questao SERIAL PRIMARY KEY,
    int_cd_prova INT NOT NULL,
    int_cd_tipo_questao INT NOT NULL,
    int_cd_enunciado INT NOT NULL,
    chr_titulo_questao VARCHAR(100),
    CONSTRAINT fk_prova FOREIGN KEY (int_cd_prova) REFERENCES PROVA(int_cd_prova),
    CONSTRAINT fk_tipo_questao FOREIGN KEY (int_cd_tipo_questao) REFERENCES TIPO_QUESTAO(int_cd_tipo_questao),
    CONSTRAINT fk_enunciado FOREIGN KEY (int_cd_enunciado) REFERENCES ENUNCIADO(int_cd_enunciado)
);


CREATE TABLE alternativas (
    int_cd_alternativa SERIAL PRIMARY KEY,
    int_cd_questao INT NOT NULL,
    chr_letra_alternativa CHAR(1),
    chr_alternativa TEXT,
    CONSTRAINT fk_questao FOREIGN KEY (int_cd_questao) REFERENCES QUESTAO(int_cd_questao)
);

CREATE TABLE resposta_multiplaescolha (
    int_cd_resposta SERIAL PRIMARY KEY,
    int_cd_questao INT NOT NULL,
    int_cd_alternativa INT NOT NULL,
    CONSTRAINT fk_questao FOREIGN KEY (int_cd_questao) REFERENCES QUESTAO(int_cd_questao),
    CONSTRAINT fk_alternativa FOREIGN KEY (int_cd_alternativa) REFERENCES ALTERNATIVAS(int_cd_alternativa)
);

CREATE TABLE resposta_discursiva (
    int_cd_resposta SERIAL PRIMARY KEY,
    int_cd_questao INT NOT NULL,
    txt_padrao_resposta TEXT,
    CONSTRAINT fk_questao FOREIGN KEY (int_cd_questao) REFERENCES QUESTAO(int_cd_questao)
);

CREATE TABLE disciplina (
    int_cd_disciplina SERIAL PRIMARY KEY,
    chr_disciplina VARCHAR(100)
);


INSERT INTO curso (chr_curso) VALUES ('engenharia da computacao');
INSERT INTO curso (chr_curso) VALUES ('sistemas de informacao');


INSERT INTO tipo_questao (chr_tipo_questao) VALUES ('discursiva');
INSERT INTO tipo_questao (chr_tipo_questao) VALUES ('multipla escolha');
