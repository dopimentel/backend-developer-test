const express = require('express');
const pool = require('./models/db');

const app = express();

app.use(express.json());

// Rota de exemplo
app.get('/', async (req, res) => {
 try {
   const result = await pool.query('SELECT $1::text as message', ['Hello World']);
   res.json({ message: result.rows[0].message });
 } catch (error) {
   console.error('Erro na consulta ao banco de dados:', error);
   res.status(500).json({ error: 'Erro interno do servidor' });
 }
});

app.get('/companies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM companies');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro na consulta ao banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = app;