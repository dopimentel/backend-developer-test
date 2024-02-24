const express = require('express');
require('express-async-errors');
const pool = require('./models/db');
const companiesRoutes = require('./routes/companies');
const jobsRoutes = require('./routes/jobs');
const feedRoutes = require('./routes/feed');

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

app.use('/companies', companiesRoutes);
app.use('/jobs', jobsRoutes);
app.use('/feed', feedRoutes);

app.use((err, req, res, _next) => {
  console.error(err.stack);
  if (err.code && err.code.startsWith('22')) {
    res.status(400).json({ error: 'Bad request - PostgreSQL input constraint violation' });
  } 
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;