"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personagem = void 0;
const mongoose_1 = require("mongoose");
const personagemSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    imagem_url: { type: String },
});
exports.Personagem = (0, mongoose_1.model)('Personagem', personagemSchema);
