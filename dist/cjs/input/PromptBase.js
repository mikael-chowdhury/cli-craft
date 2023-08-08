"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptBase = void 0;
const chalk_1 = __importDefault(require("chalk"));
const PromptBase = (options) => {
    const str = ` ${chalk_1.default.greenBright("?")} ${options.prompt}`;
    process.stdout.write(str);
    return options.prompt.length + 3;
};
exports.PromptBase = PromptBase;
