import { Request, Response } from 'express';
import { Criador } from '../models/criador';

export const criarCriador = async (req: Request, res: Response) => {
  try {
    const criador = new Criador(req.body);
    const salvo = await criador.save();
    res.status(201).json(salvo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const listarCriadores = async (req: Request, res: Response) => {
  try {
    const criadores = await Criador.find();
    res.json(criadores);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const obterCriador = async (req: Request, res: Response) => {
  try {
    const criador = await Criador.findById(req.params.id);
    if (!criador) {
      return res.status(404).json({ error: 'Criador não encontrado' });
    }
    res.json(criador);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const atualizarCriador = async (req: Request, res: Response) => {
  try {
    const criador = await Criador.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!criador) {
      return res.status(404).json({ error: 'Criador não encontrado' });
    }
    res.json(criador);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deletarCriador = async (req: Request, res: Response) => {
  try {
    const criador = await Criador.findByIdAndDelete(req.params.id);
    if (!criador) {
      return res.status(404).json({ error: 'Criador não encontrado' });
    }
    res.status(200).json({ message: 'Criador deletado com sucesso' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
