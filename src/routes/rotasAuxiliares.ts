import { Router } from 'express';
import { Personagem } from '../models/personagem';
import { Comic } from '../models/comic';
import { Criador } from '../models/criador';

const router = Router();

// Listar todos os roteiristas
router.get('/roteiristas', async (req, res) => {
  try {
    const roteiristas = await Criador.find({ funcao: 'roteirista' });
    res.json(roteiristas);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Listar todas as personagens do sexo feminino
router.get('/personagens/femininas', async (req, res) => {
  try {
    const personagensFemininas = await Personagem.find({ nome: /mulher|feminina/i });
    res.json(personagensFemininas);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Quadrinhos por data de publicação
router.get('/comics/data/:data', async (req, res) => {
  try {
    const comicsPorData = await Comic.find({ data_publicacao: req.params.data });
    res.json(comicsPorData);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Quadrinhos por criador
router.get('/criadores/:id/comics', async (req, res) => {
  try {
    const comicsPorCriador = await Comic.find({ 'criadores': req.params.id });
    res.json(comicsPorCriador);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Contagem de quadrinhos
router.get('/comics/contagem', async (req, res) => {
  try {
    const contagem = await Comic.countDocuments();
    res.json({ contagem });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
