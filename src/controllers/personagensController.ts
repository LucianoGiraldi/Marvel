import { Request, Response } from 'express';
import { Personagem } from '../models/personagem';

export const criarPersonagem = async (req: Request, res: Response) => {
  try {
    const personagem = new Personagem(req.body);
    const salvo = await personagem.save();
    res.status(201).json(salvo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const listarPersonagens = async (req: Request, res: Response) => {
  try {
    const personagens = await Personagem.find();
    res.json(personagens);
  } catch (err: any) {
  res.status(500).json({ error: err.message });
    }
};

export const obterPersonagem = async (req: Request, res: Response) => {
  try {
    const personagem = await Personagem.findById(req.params.id);
    if (!personagem) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    res.json(personagem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const atualizarPersonagem = async (req: Request, res: Response) => {
  try {
    const personagem = await Personagem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!personagem) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    res.json(personagem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletarPersonagem = async (req: Request, res: Response) => {
  try {
    const personagem = await Personagem.findByIdAndDelete(req.params.id);
    if (!personagem) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    res.status(200).json({ message: 'Personagem deletado com sucesso' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
