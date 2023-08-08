import { should, expect } from "chai";
import * as clicraft from "../../src/index";
should();

describe("Input Unit Tests", () => {
  // it("should prompt the user", () => {
  //   return new Promise<void>(async (res, rej) => {
  //     Prompt.setRenderer("emojis", (text) => "🍉".repeat(text.length));
  //     const name = await Prompt({
  //       prompt: "what is your name?",
  //       type: "string",
  //     });
  //     const age = await Prompt({
  //       prompt: "how old are you?",
  //       type: "number",
  //       validate: (text) =>
  //         parseInt(text) > 18 ? true : "You need to be older than 18!",
  //     });
  //     const password = await Prompt({
  //       prompt: "enter password [hidden]",
  //       type: "any",
  //       renderer: "emojis",
  //     });
  //     console.log(
  //       `${name} is ${age} years old, and their password is ${password}`
  //     );
  //     res();
  //   });
  // });

  it("should prompt the user with file autocompletion", () => {
    return new Promise(async (res, rej) => {
      clicraft.LoadPlugin(new clicraft.plugins.FilePathPrompt());
      const path = await clicraft.Prompt({
        prompt: "file path",
        type: "any",
        renderer: "path",
      });
    });
  });

  // it("should give the user multiple choices", () => {
  //   return new Promise(async (res, rej) => {
  //     await MultipleChoice({
  //       question: "what is your favourite colour?",
  //       choices: ["red", "green", "blue", "yellow"],
  //     });
  //   });
  // });
  // it("should give the user a checkbox", () => {
  //   return new Promise(async (req, rej) => {
  //     await CheckBox({
  //       prompt: "select whether or not you like each of the colours",
  //       choices: ["red", "green", { name: "blue", value: true }, "yellow"],
  //     });
  //   });
  // });
});
