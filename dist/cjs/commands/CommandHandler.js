"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const command_line_args_1 = __importDefault(require("command-line-args"));
const CommandRegistry_1 = require("./CommandRegistry");
const chalk_1 = __importDefault(require("chalk"));
const SetDefaultObjectProperties_1 = __importDefault(require("../util/SetDefaultObjectProperties"));
const CommandHandler = (opts = {}, options = []) => {
    const optsAsserted = (0, SetDefaultObjectProperties_1.default)(opts, {
        ignoreNoCommandFound: true,
    });
    const result = (0, command_line_args_1.default)([{ name: "command", defaultValue: true, defaultOption: true }, ...options], { stopAtFirstUnknown: true });
    if (result.command) {
        const command = CommandRegistry_1.CommandRegistry.Get(result.command);
        if (command) {
            command.exec(result._unknown || [], result);
        }
        else if (!optsAsserted.ignoreNoCommandFound) {
            if (result.command == true) {
                console.log(chalk_1.default.red("Unspecified command"));
            }
            else
                console.log(chalk_1.default.red("Invalid command " + chalk_1.default.bold(result.command)));
        }
    }
};
exports.CommandHandler = CommandHandler;
