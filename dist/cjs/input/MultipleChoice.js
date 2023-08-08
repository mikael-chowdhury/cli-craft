"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleChoice = void 0;
const chalk_1 = __importDefault(require("chalk"));
const readline_1 = __importDefault(require("readline"));
const PromptBase_1 = require("../input/PromptBase");
const renderChoice = (choice, newline = true) => {
    process.stdout.write("   " + choice + (newline ? "\n" : ""));
    process.stdout.cursorTo(0);
};
const MultipleChoice = (options) => {
    return new Promise((res, rej) => {
        (0, PromptBase_1.PromptBase)({ prompt: options.prompt });
        process.stdout.write("\n\n");
        let newlines = 0;
        options.choices.forEach((option, index) => {
            renderChoice(index == 0 ? chalk_1.default.cyan(option) : option);
            newlines++;
        });
        process.stdout.write(`\n\n${chalk_1.default.dim("   use arrow keys to select option, enter to toggle\n")}`);
        newlines += 3;
        process.stdout.moveCursor(0, -newlines);
        process.stdout.cursorTo(0);
        process.stdin.setRawMode(true);
        readline_1.default.emitKeypressEvents(process.stdin);
        let currentY = 0;
        const callback = (data, key) => {
            if (key && key.name == "c" && key.ctrl) {
                process.exit(0);
            }
            else if (key.name == "return") {
                process.stdout.moveCursor(0, -newlines - currentY + 5);
                process.stdout.clearLine(0);
                for (let i = 0; i < newlines; i++) {
                    process.stdout.clearLine(0);
                    process.stdout.moveCursor(0, 1);
                }
                process.stdout.moveCursor(0, -newlines - 1);
                process.stdout.write(chalk_1.default.cyan("   >>>") + ` ${options.choices[currentY]}`);
                process.stdout.moveCursor(-100, 2);
                process.stdout.cursorTo(0);
                process.stdin.setRawMode(false);
                process.stdin.removeListener("keypress", callback);
                res(options.choices[currentY]);
            }
            else {
                let yBefore = currentY;
                if (key.name == "up") {
                    currentY = Math.max(0, currentY - 1);
                }
                else if (key.name == "down") {
                    currentY = Math.min(currentY + 1, options.choices.length - 1);
                }
                process.stdout.clearLine(0);
                renderChoice(options.choices[yBefore], false);
                process.stdout.moveCursor(0, currentY - yBefore);
                process.stdout.clearLine(0);
                renderChoice(chalk_1.default.cyan(options.choices[currentY]), false);
            }
        };
        process.stdin.on("keypress", callback);
    });
};
exports.MultipleChoice = MultipleChoice;
globalThis.MultipleChoice = MultipleChoice;
