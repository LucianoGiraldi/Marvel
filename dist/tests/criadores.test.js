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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const criador_1 = require("../models/criador");
const mongoose_1 = __importDefault(require("mongoose"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield criador_1.Criador.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe('Rotas para Criadores', () => {
    it('Deve criar um novo criador', () => __awaiter(void 0, void 0, void 0, function* () {
        const novoCriador = {
            nome: 'Stan Lee',
            funcao: 'Roteirista',
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/criadores')
            .send(novoCriador)
            .expect(201);
        expect(res.body.nome).toBe(novoCriador.nome);
    }));
    it('Deve listar todos os criadores', () => __awaiter(void 0, void 0, void 0, function* () {
        yield criador_1.Criador.create([
            { nome: 'Stan Lee', funcao: 'Roteirista' },
            { nome: 'Jack Kirby', funcao: 'Desenhista' },
        ]);
        const res = yield (0, supertest_1.default)(app_1.default).get('/criadores').expect(200);
        expect(res.body.length).toBe(2);
    }));
    it('Deve obter um criador por ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const criador = yield criador_1.Criador.create({
            nome: 'Stan Lee',
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .get(`/criadores/${criador._id}`)
            .expect(200);
        expect(res.body.nome).toBe('Stan Lee');
    }));
    it('Deve atualizar um criador por ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const criador = yield criador_1.Criador.create({
            nome: 'Stan Lee',
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/criadores/${criador._id}`)
            .send({ nome: 'Stan Lee Atualizado' })
            .expect(200);
        expect(res.body.nome).toBe('Stan Lee Atualizado');
    }));
    it('Deve deletar um criador por ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const criador = yield criador_1.Criador.create({
            nome: 'Stan Lee',
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/criadores/${criador._id}`)
            .expect(200);
        expect(res.body.message).toBe('Criador deletado com sucesso');
    }));
});
