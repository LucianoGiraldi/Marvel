"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personagensController_1 = require("../controllers/personagensController");
const router = (0, express_1.Router)();
router.post('/', personagensController_1.criarPersonagem);
router.get('/', personagensController_1.listarPersonagens);
router.get('/:id', personagensController_1.obterPersonagem);
router.put('/:id', personagensController_1.atualizarPersonagem);
router.delete('/:id', personagensController_1.deletarPersonagem);
exports.default = router;