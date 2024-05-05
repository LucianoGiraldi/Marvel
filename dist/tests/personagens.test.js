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
const personagem_1 = require("../models/personagem");
const mongoose_1 = __importDefault(require("mongoose"));
// Limpar o banco de dados antes de cada teste
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield personagem_1.Personagem.deleteMany({});
}));
// Fechar a conexão do banco após todos os testes
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe('Rotas para Personagens', () => {
    it('Deve criar um novo personagem', () => __awaiter(void 0, void 0, void 0, function* () {
        const novoPersonagem = {
            nome: 'Homem de Ferro',
            descricao: 'O gênio, bilionário, playboy, filantropo',
            imagem_url: 'http://example.com/imagem.jpg',
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/personagens')
            .send(novoPersonagem)
            .expect(201);
        expect(res.body.nome).toBe(novoPersonagem.nome);
    }));
    it('Deve listar todos os personagens', () => __awaiter(void 0, void 0, void 0, function* () {
        yield personagem_1.Personagem.create([
            { nome: 'Homem de Ferro', descricao: 'Um herói' },
            { nome: 'Capitão América', descricao: 'Outro herói' },
        ]);
        const res = yield (0, supertest_1.default)(app_1.default).get('/personagens').expect(200);
        expect(res.body.length).toBe(2);
    }));
    it('Deve obter um personagem por ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const personagem = yield personagem_1.Personagem.create({
            nome: 'Homem de Ferro',
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .get(`/personagens/${personagem._id}`)
            .expect(200);
        expect(res.body.nome).toBe('Homem de Ferro');
    }));
    it('Deve atualizar um personagem por ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const personagem = yield personagem_1.Personagem.create({
            nome: 'Homem de Ferro',
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/personagens/${personagem._id}`)
            .send({ nome: 'Homem de Ferro Atualizado' })
            .expect(200);
        expect(res.body.nome).toBe('Homem de Ferro Atualizado');
    }));
    it('Deve deletar um personagem por ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const personagem = yield personagem_1.Personagem.create({
            nome: 'Homem de Ferro',
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/personagens/${personagem._id}`)
            .expect(200);
        expect(res.body.message).toBe('Personagem deletado com sucesso');
    }));
});
