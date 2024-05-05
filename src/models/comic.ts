import { Schema, model, Document } from 'mongoose';

interface IComic extends Document {
  titulo: string;
  descricao: string;
  data_publicacao: Date;
  capa_url: string;
}

const comicSchema = new Schema<IComic>({
  titulo: { type: String, required: true },
  descricao: { type: String },
  data_publicacao: { type: Date, required: true },
  capa_url: { type: String },
});

export const Comic = model<IComic>('Comic', comicSchema);
