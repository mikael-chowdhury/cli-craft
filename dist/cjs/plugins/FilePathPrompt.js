"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilePathPrompt = void 0;
const index_1 = require("../input/index");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FilePathPrompt {
    constructor() {
        this.name = "File Path Prompt";
        this.version = "1.0.0";
        this.initRenderers = () => {
            index_1.Prompt.setRenderer("path", (text) => {
                const pathDown = text.split(path_1.default.sep).slice(0, -1).join(path_1.default.sep);
                const fullPath = text;
                if (fs_1.default.existsSync(pathDown) && fs_1.default.statSync(pathDown).isDirectory()) {
                    const autoCompletePossibilities = fs_1.default
                        .readdirSync(pathDown)
                        .filter((x) => x.startsWith(path_1.default.basename(fullPath)))
                        .sort((a, b) => a.length - b.length);
                    if (autoCompletePossibilities.length > 0) {
                        const bestCompletion = autoCompletePossibilities[0];
                        const toAppend = bestCompletion.slice(path_1.default.basename(fullPath).length);
                        return text + chalk_1.default.grey(toAppend);
                    }
                    else
                        return text;
                }
                else if (fs_1.default.existsSync(fullPath)) {
                    return chalk_1.default.bold(fullPath);
                }
                return fullPath;
            });
        };
        this.initPlugins = () => { };
        this.onReady = () => { };
    }
}
exports.FilePathPrompt = FilePathPrompt;
