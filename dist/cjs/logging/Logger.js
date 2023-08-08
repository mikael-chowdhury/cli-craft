"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const fs_1 = __importDefault(require("fs"));
const stream_1 = require("stream");
const ToString_1 = __importDefault(require("../util/ToString"));
const chalk_1 = __importDefault(require("chalk"));
const FormatLoggerLines_1 = __importDefault(require("../util/FormatLoggerLines"));
class Logger extends stream_1.PassThrough {
    constructor() {
        super();
        this.wroteNewline = true;
        this.EntireLog = "";
    }
    updateNewline(message) {
        this.wroteNewline = message.endsWith("\n");
    }
    log(message) {
        let finalString = (0, ToString_1.default)(message);
        this.EntireLog += finalString;
        this.write(finalString);
    }
    debug(message, newline = true) {
        let finalString = (0, ToString_1.default)(message);
        finalString = (0, FormatLoggerLines_1.default)("debug", finalString, chalk_1.default.yellow, this.wroteNewline);
        this.updateNewline(finalString + (newline ? "\n" : ""));
        this.log(finalString + (newline ? "\n" : ""));
    }
    error(message, newline = true) {
        let finalString = (0, ToString_1.default)(message);
        finalString = (0, FormatLoggerLines_1.default)("error", finalString, chalk_1.default.red, this.wroteNewline);
        this.updateNewline(finalString + (newline ? "\n" : ""));
        this.log(finalString + (newline ? "\n" : ""));
    }
    success(message, newline = true) {
        let finalString = (0, ToString_1.default)(message);
        finalString = (0, FormatLoggerLines_1.default)("success", finalString, chalk_1.default.green, this.wroteNewline);
        this.updateNewline(finalString + (newline ? "\n" : ""));
        this.log(finalString + (newline ? "\n" : ""));
    }
    export(path) {
        if (fs_1.default.existsSync(path) && fs_1.default.statSync(path).isFile()) {
            fs_1.default.writeFileSync(path, chalk_1.default.reset(this.EntireLog));
        }
        else
            console.log(chalk_1.default.red.bold("invalid path or path is not a file!"));
    }
}
exports.Logger = Logger;
