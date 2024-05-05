"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarvelAuthParams = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getMarvelAuthParams = () => {
    const ts = Date.now().toString();
    const publicKey = process.env.MARVEL_PUBLIC_KEY || '';
    const privateKey = process.env.MARVEL_PRIVATE_KEY || '';
    const hash = crypto_1.default.createHash('md5').update(ts + privateKey + publicKey).digest('hex');
    return {
        ts,
        apikey: publicKey,
        hash,
    };
};
exports.getMarvelAuthParams = getMarvelAuthParams;
