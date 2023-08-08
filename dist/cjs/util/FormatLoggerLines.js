"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const GetTimestamp_1 = __importDefault(require("../util/GetTimestamp"));
exports.default = (level, message, colour, writeTimestamp = true) => message
    .split("\n")
    .map((line) => writeTimestamp
    ? colour(chalk_1.default.bold(` [${level.toUpperCase()}] `) +
        " ".repeat(Math.max(0 - (level.length - 7), 0)) +
        (0, GetTimestamp_1.default)() +
        " " +
        line)
    : colour(message))
    .join("\n");
