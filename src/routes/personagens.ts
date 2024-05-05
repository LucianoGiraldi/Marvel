import express from 'express';
import { 
  criarPersonagem,
  listarPersonagens,
  obterPersonagem,
  atualizarPersonagem,
  deletarPersonagem,
} from '../controllers/personagensController';  // Importa os controladores associados

const router = express.Router();

// Rota para criar um novo personagem
router.post('/', criarPersonagem);

// Rota para listar todos os personagens
router.get('/', listarPersonagens);

// Rota para obter um personagem pelo ID
router.get('/:id', obterPersonagem);

// Rota para atualizar um personagem pelo ID
router.put('/:id', atualizarPersonagem);

// Rota para deletar um personagem pelo ID
router.delete('/:id', deletarPersonagem);

export default router;  // Exporta o router para ser usado no arquivo principal
