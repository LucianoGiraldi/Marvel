import { Router } from 'express';
import { 
  criarCriador,
  listarCriadores,
  obterCriador,
  atualizarCriador,
  deletarCriador,
} from '../controllers/criadoresController';

const router = Router();

router.post('/', criarCriador);
router.get('/', listarCriadores);
router.get('/:id', obterCriador);
router.put('/:id', atualizarCriador);
router.delete('/:id', deletarCriador);

export default router;
