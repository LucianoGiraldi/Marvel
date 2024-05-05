import express from 'express';
import personagensRouter from './routes/personagens';  // Importa o router para "Personagens"

const app = express();
const port = process.env.PORT || 3001;

// Middleware para processar requisições JSON
app.use(express.json());

// Use as rotas para "Personagens"
app.use('/personagens', personagensRouter);  // Associa a rota ao caminho '/personagens'

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
