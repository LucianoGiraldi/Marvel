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
const comic_1 = require("../models/comic");
const mongoose_1 = __importDefault(require("mongoose"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield comic_1.Comic.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
describe('Rotas para Comics', () => {
    it('Deve criar um novo quadrinho', () => __awaiter(void 0, void 0, void 0, function* () {
        const novoComic = {
            titulo: 'Capitão América #1',
            descricao: 'Primeiro quadrinho do Capitão América',
            data_publicacao: new Date('1941-03-01'),
            capa_url: 'http://example.com/capa.jpg',
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/comics')
            .send(novoComic)
            .expect(201);
        expect(res.body.titulo).toBe(novoComic.titulo);
    }));
    it('Deve listar todos os quadrinhos', () => __awaiter(void 0, void 0, void 0, function* () {
        yield comic_1.Comic.create([
            {
                titulo: 'Capitão América #1',
                descricao: 'Primeiro quadrinho do Capitão América',
            },
            {
                titulo: 'Capitão América #2',
                descricao: 'Segundo quadrinho do Capitão América',
            },
        ]);
        const res = yield (0, supertest_1.default)(app_1.default).get('/comics').expect(200);
        expect(res.body.length).toBe(2);
    }));
    it('Deve obter um quadrinho por ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const comic = yield comic_1.Comic.create({
            titulo: 'Capitão América #1',
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .get(`/comics/${comic._id}`)
            .expect(200);
        expect(res.body.titulo).toBe('Capitão América #1');
    }));
    it('Deve atualizar um quadrinho por ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const comic = yield comic_1.Comic.create({
            titulo: 'Capitão América #1',
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/comics/${comic._id}`)
            .send({ titulo: 'Capitão América #1 Atualizado' })
            .expect(200);
        expect(res.body.titulo).toBe('Capitão América #1 Atualizado');
    }));
    it('Deve deletar um quadrinho por ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const comic = yield comic_1.Comic.create({
            titulo: 'Capitão América #1',
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/comics/${comic._id}`)
            .expect(200);
        expect(res.body.message).toBe('Quadrinho deletado com sucesso');
    }));
});
