const path = require("path");
const clicraft = require("..");

(async () => {
  const logger = new clicraft.Logger();

  await clicraft.CommandLoader.LoadFromDirectory(path.resolve("./commands"));

  clicraft.CommandHandler();
})();
