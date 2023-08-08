"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBox = void 0;
const chalk_1 = __importDefault(require("chalk"));
const readline_1 = __importDefault(require("readline"));
const PromptBase_1 = require("../input/PromptBase");
const renderChoice = (choice, value, newline = true) => {
    process.stdout.write(` ${chalk_1.default.greenBright(value == true ? "◉" : "○")} ` +
        choice +
        (newline ? "\n" : ""));
    process.stdout.cursorTo(0);
};
const CheckBox = (options) => {
    return new Promise((res, rej) => {
        const choices = options.choices.map((choice) => {
            if (choice.name)
                return choice;
            return { name: choice, value: false };
        });
        (0, PromptBase_1.PromptBase)({ prompt: options.prompt });
        process.stdout.write("\n\n");
        let newlines = 0;
        options.choices.forEach((option, index) => {
            const choice = option.name || option;
            renderChoice(index == 0 ? chalk_1.default.cyan(choice) : choice, option.value
                ? option.value
                : false);
            newlines++;
        });
        process.stdout.write(chalk_1.default.green("   done\n"));
        newlines++;
        process.stdout.write(`\n\n${chalk_1.default.dim("   use arrow keys to select option, enter to finalise\n")}`);
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
                if (currentY == choices.length) {
                    process.stdout.moveCursor(0, -newlines - currentY + 5);
                    for (let i = 0; i < newlines; i++) {
                        process.stdout.clearLine(0);
                        process.stdout.moveCursor(0, 1);
                    }
                    process.stdout.moveCursor(0, -newlines - 1);
                    process.stdin.setRawMode(false);
                    process.stdin.removeListener("keypress", callback);
                    res(choices);
                }
                else {
                    choices[currentY].value = !choices[currentY].value;
                    process.stdout.clearLine(0);
                    renderChoice(choices[currentY].name, choices[currentY].value, false);
                }
            }
            else {
                let yBefore = currentY;
                if (key.name == "up") {
                    currentY = Math.max(0, currentY - 1);
                }
                else if (key.name == "down") {
                    currentY = Math.min(currentY + 1, choices.length);
                }
                process.stdout.clearLine(0);
                if (yBefore != choices.length) {
                    renderChoice(choices[yBefore].name, choices[yBefore].value, false);
                }
                else {
                    process.stdout.write(chalk_1.default.green("   done"));
                    process.stdout.cursorTo(0);
                }
                process.stdout.moveCursor(0, currentY - yBefore);
                process.stdout.clearLine(0);
                if (currentY != choices.length) {
                    renderChoice(chalk_1.default.cyan(choices[currentY].name), choices[currentY].value, false);
                }
                else {
                    process.stdout.write("   " + chalk_1.default.greenBright.underline("done"));
                    process.stdout.cursorTo(0);
                }
            }
        };
        process.stdin.on("keypress", callback);
    });
};
exports.CheckBox = CheckBox;
globalThis.CheckBox = CheckBox;
