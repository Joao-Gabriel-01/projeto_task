const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // habilita o cors para todas as rotas
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});