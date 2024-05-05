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
const express_1 = require("express");
const personagem_1 = require("../models/personagem");
const comic_1 = require("../models/comic");
const criador_1 = require("../models/criador");
const router = (0, express_1.Router)();
// Listar todos os roteiristas
router.get('/roteiristas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roteiristas = yield criador_1.Criador.find({ funcao: 'roteirista' });
        res.json(roteiristas);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Listar todas as personagens do sexo feminino
router.get('/personagens/femininas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personagensFemininas = yield personagem_1.Personagem.find({ nome: /mulher|feminina/i });
        res.json(personagensFemininas);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Quadrinhos por data de publicação
router.get('/comics/data/:data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comicsPorData = yield comic_1.Comic.find({ data_publicacao: req.params.data });
        res.json(comicsPorData);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Quadrinhos por criador
router.get('/criadores/:id/comics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comicsPorCriador = yield comic_1.Comic.find({ 'criadores': req.params.id });
        res.json(comicsPorCriador);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Contagem de quadrinhos
router.get('/comics/contagem', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contagem = yield comic_1.Comic.countDocuments();
        res.json({ contagem });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
