import { Schema, model, Document } from 'mongoose';

interface IPersonagem extends Document {
  nome: string;
  descricao: string;
  imagem_url: string;
}

const personagemSchema = new Schema<IPersonagem>({
  nome: { type: String, required: true },
  descricao: { type: String },
  imagem_url: { type: String },
});

export const Personagem = model<IPersonagem>('Personagem', personagemSchema);
