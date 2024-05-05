"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rotasAuxiliares_1 = __importDefault(require("./routes/rotasAuxiliares"));
const app_1 = require("./app");
app_1.app.use('/aux', rotasAuxiliares_1.default);
