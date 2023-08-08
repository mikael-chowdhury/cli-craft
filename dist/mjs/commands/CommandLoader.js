import fs from "fs";
import path from "path";
import { CommandRegistry } from ".//CommandRegistry";
const LoadFromDirectory = (dir, subcategories = false) => {
    return new Promise((res, rej) => {
        let commandFilePaths = [];
        fs.readdirSync(dir).forEach((result, i) => {
            if (subcategories) {
                fs.readdirSync(path.join(dir, result)).forEach((file) => {
                    commandFilePaths.push(path.join(dir, result, file));
                });
            }
            else {
                commandFilePaths.push(path.join(dir, result));
            }
        });
        commandFilePaths.forEach((file, fileNumber) => {
            import(file).then((command) => {
                const { aliases, exec, name } = command;
                const cmd = { aliases, exec, name };
                CommandRegistry.Set(cmd.name, cmd);
                if (fileNumber == commandFilePaths.length - 1) {
                    res();
                }
            });
        });
    });
};
export { LoadFromDirectory };
