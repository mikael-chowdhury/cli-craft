import cla from "command-line-args";
import { CommandRegistry } from "./CommandRegistry";
import chalk from "chalk";
import SetDefaultObjectProperties from "../util/SetDefaultObjectProperties";
export const CommandHandler = (opts = {}, options = []) => {
    const optsAsserted = SetDefaultObjectProperties(opts, {
        ignoreNoCommandFound: true,
    });
    const result = cla([{ name: "command", defaultValue: true, defaultOption: true }, ...options], { stopAtFirstUnknown: true });
    if (result.command) {
        const command = CommandRegistry.Get(result.command);
        if (command) {
            command.exec(result._unknown || [], result);
        }
        else if (!optsAsserted.ignoreNoCommandFound) {
            if (result.command == true) {
                console.log(chalk.red("Unspecified command"));
            }
            else
                console.log(chalk.red("Invalid command " + chalk.bold(result.command)));
        }
    }
};
