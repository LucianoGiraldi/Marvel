"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comic = void 0;
const mongoose_1 = require("mongoose");
const comicSchema = new mongoose_1.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    data_publicacao: { type: Date, required: true },
    capa_url: { type: String },
});
exports.Comic = (0, mongoose_1.model)('Comic', comicSchema);
