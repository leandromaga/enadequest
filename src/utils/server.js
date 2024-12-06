// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configurações do PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tcc_teste',
  password: 'admin',
  port: 5432,
});

// Testar conexão com o banco de dados na inicialização
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados:', err.stack);
  }
  console.log('Conexão bem-sucedida ao banco de dados.');
  release();
});

// Consulta para questões objetivas
const sqlQueryObjetiva = `
  SELECT 
    t1.chr_titulo_questao AS numero_questao, 
    t2.chr_enunciado AS enunciado, 
    STRING_AGG(CONCAT(t3.chr_letra_alternativa, ' - ', t3.chr_alternativa), ' | ') AS alternativas, 
    t4.chr_letra_alternativa AS resposta_correta
  FROM 
    questao t1
  LEFT JOIN 
    enunciado t2 ON t1.int_cd_enunciado = t2.int_cd_enunciado
  LEFT JOIN 
    alternativas t3 ON t3.int_cd_questao = t1.int_cd_questao
  LEFT JOIN 
    (SELECT res.*, alt.chr_letra_alternativa FROM resposta res 
     LEFT JOIN alternativas alt ON alt.int_cd_alternativa = res.int_cd_alternativa) t4 
  ON t4.int_cd_questao = t1.int_cd_questao
  WHERE 
    t1.chr_titulo_questao NOT LIKE '%discursiva%'
	AND t4.chr_letra_alternativa IS NOT NULL
  GROUP BY 
    t1.chr_titulo_questao, t2.chr_enunciado, t4.chr_letra_alternativa
ORDER BY 
	RANDOM()
  LIMIT 5
`;

// Consulta para questões discursivas
const sqlQuestaoDiscursiva = `
  SELECT
    t1.chr_titulo_questao AS numero_questao,
    t2.chr_enunciado AS enunciado,
    t4.txt_padrao_resposta AS resposta_correta
  FROM 
    questao t1
  LEFT JOIN 
    enunciado t2 ON t1.int_cd_enunciado = t2.int_cd_enunciado
  LEFT JOIN 
    respostas_discursivas t4 ON t4.int_cd_questao = t1.int_cd_questao
  WHERE 
    t1.chr_titulo_questao LIKE '%discursiva%'
  ORDER BY 
    RANDOM()
  LIMIT 5
`;

// Função para consultar questões objetivas
app.post('/api/objective-questions', async (req, res) => {
  try {
    const result = await pool.query(sqlQueryObjetiva);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar questões objetivas:', error.message);
    res.status(500).json({ error: 'Erro ao consultar questões objetivas' });
  }
});

// Função para consultar questões discursivas
app.post('/api/discursive-questions', async (req, res) => {
  try {
    const result = await pool.query(sqlQuestaoDiscursiva);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar questões discursivas:', error.message);
    res.status(500).json({ error: 'Erro ao consultar questões discursivas' });
  }
});

app.get('/api/disciplines', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM disciplina');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao consultar disciplinas:', error.message);
    res.status(500).json({ error: 'Erro ao consultar disciplinas' });
  }
});

app.post('/api/disciplines', async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Nome da disciplina é obrigatório' });
  }

  try {
    const result = await pool.query('INSERT INTO disciplina (chr_disciplina) VALUES ($1) RETURNING *', [name]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao inserir disciplina:', error.message);
    res.status(500).json({ error: 'Erro ao inserir disciplina' });
  }
});


// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});