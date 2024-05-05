"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Criador = void 0;
const mongoose_1 = require("mongoose");
const criadorSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    funcao: { type: String },
    comics: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comic' }],
});
exports.Criador = (0, mongoose_1.model)('Criador', criadorSchema);
