"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarPersonagem = exports.atualizarPersonagem = exports.obterPersonagem = exports.listarPersonagens = exports.criarPersonagem = void 0;
const personagem_1 = require("../models/personagem");
const criarPersonagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personagem = new personagem_1.Personagem(req.body);
        const salvo = yield personagem.save();
        res.status(201).json(salvo);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.criarPersonagem = criarPersonagem;
const listarPersonagens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personagens = yield personagem_1.Personagem.find();
        res.json(personagens);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.listarPersonagens = listarPersonagens;
const obterPersonagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personagem = yield personagem_1.Personagem.findById(req.params.id);
        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado' });
        }
        res.json(personagem);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.obterPersonagem = obterPersonagem;
const atualizarPersonagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personagem = yield personagem_1.Personagem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado' });
        }
        res.json(personagem);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.atualizarPersonagem = atualizarPersonagem;
const deletarPersonagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personagem = yield personagem_1.Personagem.findByIdAndDelete(req.params.id);
        if (!personagem) {
            return res.status(404).json({ error: 'Personagem não encontrado' });
        }
        res.status(200).json({ message: 'Personagem deletado com sucesso' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deletarPersonagem = deletarPersonagem;
