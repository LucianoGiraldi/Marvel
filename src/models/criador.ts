import { Schema, model, Document } from 'mongoose';

interface ICriador extends Document {
  nome: string;
  funcao: string;
  comics: Schema.Types.ObjectId[];
}

const criadorSchema = new Schema<ICriador>({
  nome: { type: String, required: true },
  funcao: { type: String },
  comics: [{ type: Schema.Types.ObjectId, ref: 'Comic' }],
});

export const Criador = model<ICriador>('Criador', criadorSchema);
