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
exports.deletarCriador = exports.atualizarCriador = exports.obterCriador = exports.listarCriadores = exports.criarCriador = void 0;
const criador_1 = require("../models/criador");
const criarCriador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const criador = new criador_1.Criador(req.body);
        const salvo = yield criador.save();
        res.status(201).json(salvo);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.criarCriador = criarCriador;
const listarCriadores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const criadores = yield criador_1.Criador.find();
        res.json(criadores);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.listarCriadores = listarCriadores;
const obterCriador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const criador = yield criador_1.Criador.findById(req.params.id);
        if (!criador) {
            return res.status(404).json({ error: 'Criador não encontrado' });
        }
        res.json(criador);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.obterCriador = obterCriador;
const atualizarCriador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const criador = yield criador_1.Criador.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!criador) {
            return res.status(404).json({ error: 'Criador não encontrado' });
        }
        res.json(criador);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.atualizarCriador = atualizarCriador;
const deletarCriador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const criador = yield criador_1.Criador.findByIdAndDelete(req.params.id);
        if (!criador) {
            return res.status(404).json({ error: 'Criador não encontrado' });
        }
        res.status(200).json({ message: 'Criador deletado com sucesso' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deletarCriador = deletarCriador;
