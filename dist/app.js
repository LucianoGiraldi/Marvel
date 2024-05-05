"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const personagens_1 = __importDefault(require("./routes/personagens"));
const comics_1 = __importDefault(require("./routes/comics"));
const criadores_1 = __importDefault(require("./routes/criadores"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Conectar ao MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || '');
// Configurações do servidor
exports.app.use(express_1.default.json());
// Rotas CRUD para Personagem
exports.app.use('/personagens', personagens_1.default);
// Rotas CRUD para Comic
exports.app.use('/comics', comics_1.default);
// Rotas CRUD para Criador
exports.app.use('/criadores', criadores_1.default);
// Iniciar o servidor
exports.app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
exports.default = exports.app;
