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
exports.deletarComic = exports.atualizarComic = exports.obterComic = exports.listarComics = exports.criarComic = void 0;
const comic_1 = require("../models/comic");
const criarComic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comic = new comic_1.Comic(req.body);
        const salvo = yield comic.save();
        res.status(201).json(salvo);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.criarComic = criarComic;
const listarComics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comics = yield comic_1.Comic.find();
        res.json(comics);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.listarComics = listarComics;
const obterComic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comic = yield comic_1.Comic.findById(req.params.id);
        if (!comic) {
            return res.status(404).json({ error: 'Quadrinho não encontrado' });
        }
        res.json(comic);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.obterComic = obterComic;
const atualizarComic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comic = yield comic_1.Comic.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!comic) {
            return res.status(404).json({ error: 'Quadrinho não encontrado' });
        }
        res.json(comic);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.atualizarComic = atualizarComic;
const deletarComic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comic = yield comic_1.Comic.findByIdAndDelete(req.params.id);
        if (!comic) {
            return res.status(404).json({ error: 'Quadrinho não encontrado' });
        }
        res.status(200).json({ message: 'Quadrinho deletado com sucesso' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deletarComic = deletarComic;
