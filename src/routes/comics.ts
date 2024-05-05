import { Router } from 'express';
import { 
  criarComic,
  listarComics,
  obterComic,
  atualizarComic,
  deletarComic,
} from '../controllers/comicsController';

const router = Router();

router.post('/', criarComic);
router.get('/', listarComics);
router.get('/:id', obterComic);
router.put('/:id', atualizarComic);
router.delete('/:id', deletarComic);

export default router;
