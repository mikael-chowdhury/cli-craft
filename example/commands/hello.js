const clicraft = require("../..");
const cla = require("command-line-args");

module.exports = {
  name: "hello",
  aliases: "h",
  exec: async (argv, flags) => {
    const result = cla(
      [
        {
          name: "name",
          alias: "n",
        },
      ],
      { argv }
    );

    console.log("running command: hello " + (result.name || "friend"));

    const friendsWanted = parseInt(
      await clicraft.Prompt({
        prompt: "how many friends do you want",
        type: "number",
        validate: (text) =>
          parseInt(text) <= 20 ? true : "you can't want more than 20 friends!",
      })
    );

    const progressBar = new clicraft.ProgressBar(
      "found friends",
      0,
      friendsWanted
    );
    progressBar.update();

    const loop = () => {
      if (progressBar.value < friendsWanted) {
        setTimeout(() => {
          progressBar.value++;
          progressBar.update();
          loop();
        }, 5000 / friendsWanted);
      }
    };

    loop();
  },
};
