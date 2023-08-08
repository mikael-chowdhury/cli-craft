import chalk from "chalk";
export const PromptBase = (options) => {
    const str = ` ${chalk.greenBright("?")} ${options.prompt}`;
    process.stdout.write(str);
    return options.prompt.length + 3;
};
