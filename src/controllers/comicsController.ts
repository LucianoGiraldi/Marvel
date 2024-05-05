import { Request, Response } from 'express';
import { Comic } from '../models/comic';

export const criarComic = async (req: Request, res: Response) => {
  try {
    const comic = new Comic(req.body);
    const salvo = await comic.save();
    res.status(201).json(salvo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    }
};

export const listarComics = async (req: Request, res: Response) => {
  try {
    const comics = await Comic.find();
    res.json(comics);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    }
};

export const obterComic = async (req: Request, res: Response) => {
  try {
    const comic = await Comic.findById(req.params.id);
    if (!comic) {
      return res.status(404).json({ error: 'Quadrinho não encontrado' });
    }
    res.json(comic);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    }
};

export const atualizarComic = async (req: Request, res: Response) => {
  try {
    const comic = await Comic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!comic) {
      return res.status(404).json({ error: 'Quadrinho não encontrado' });
    }
    res.json(comic);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    }
};

export const deletarComic = async (req: Request, res: Response) => {
  try {
    const comic = await Comic.findByIdAndDelete(req.params.id);
    if (!comic) {
      return res.status(404).json({ error: 'Quadrinho não encontrado' });
    }
    res.status(200).json({ message: 'Quadrinho deletado com sucesso' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    }
};
