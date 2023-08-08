"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prompt = void 0;
const chalk_1 = __importDefault(require("chalk"));
const readline_1 = __importDefault(require("readline"));
const SetDefaultObjectProperties_1 = __importDefault(require("../util/SetDefaultObjectProperties"));
const PromptBase_1 = require("../input/PromptBase");
const letters = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const numbers = [..."1234567890"];
const symbols = [..."!@£$%^&*()_+-=[]{}:;'\"\\|?/.,`~±§"];
const any = letters.concat(numbers).concat(symbols);
const defaultPromptOptions = {
    prompt: "",
    type: "string",
    renderer: "default",
    validate: (text) => true,
};
const writePrompt = (prompt) => {
    const length = (0, PromptBase_1.PromptBase)({ prompt });
    process.stdout.write(" ");
    return length + 1;
};
const renderPrompt = (options, unRenderedText) => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    const length = writePrompt(options.prompt);
    process.stdout.write(Prompt.renderers[options.renderer](unRenderedText));
    process.stdout.cursorTo(length + unRenderedText.length);
};
const Prompt = (optionsParam) => {
    const options = (0, SetDefaultObjectProperties_1.default)(optionsParam, defaultPromptOptions);
    let allowedChars;
    switch (options.type) {
        case "string":
            allowedChars = letters;
            break;
        case "number":
            allowedChars = numbers;
            break;
        case "any":
            allowedChars = any;
            break;
    }
    return new Promise((res, rej) => {
        writePrompt(options.prompt);
        process.stdin.setRawMode(true);
        readline_1.default.emitKeypressEvents(process.stdin);
        let unRenderedText = "";
        let validationFailed = false;
        const callback = (chunk, key) => {
            let resolved = false;
            if (key && key.name == "c" && key.ctrl) {
                process.exit(0);
            }
            else if (key.name == "return") {
                const validation = options.validate(unRenderedText);
                if (validation == true) {
                    if (validationFailed) {
                        process.stdout.moveCursor(0, 1);
                        process.stdout.clearLine(0);
                        process.stdout.moveCursor(0, -1);
                    }
                    process.stdout.write("\n");
                    process.stdin.removeAllListeners("keypress");
                    process.stdin.setRawMode(false);
                    res(unRenderedText);
                    resolved = true;
                }
                else {
                    validationFailed = true;
                    process.stdout.write(chalk_1.default.red.bold("\n >> ") +
                        (typeof validation == "string" ? validation : "Invalid Input"));
                    process.stdout.moveCursor(0, -1);
                    writePrompt(options.prompt);
                }
            }
            else if (key.name == "backspace") {
                unRenderedText = unRenderedText.slice(0, unRenderedText.length - 1);
            }
            else {
                if (allowedChars.includes(key.sequence)) {
                    unRenderedText += key.sequence;
                }
                else if (key.name == "space") {
                    unRenderedText += " ";
                }
            }
            if (!resolved) {
                renderPrompt(options, unRenderedText);
            }
            else {
                res(unRenderedText);
            }
        };
        process.stdin.on("keypress", callback);
    });
};
exports.Prompt = Prompt;
Prompt.renderers = {
    default: (text) => {
        return text;
    },
    password: (text) => {
        return "●".repeat(text.length);
    },
};
Prompt.setRenderer = (rendererName, render) => {
    Prompt.renderers[rendererName] = render;
};
globalThis.Prompt = Prompt;
