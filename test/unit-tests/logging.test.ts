import { should, expect } from "chai";
import { Logger, progressBar } from "../../src/index";
should();

// describe("Logging Unit Tests", () => {
//   it("writes the lines correctly", () => {
//     const logger = new Logger();
//     logger.pipe(process.stdout);

//     logger.debug("hello", false);
//     logger.success(" brilliant ", false);
//     logger.error("world");
//     logger.debug("hello", false);
//     logger.success(" brilliant ", false);
//     logger.error("world");
//   });

//   it("updates progressBar correctly", () => {
//     const logger = new Logger();
//     logger.pipe(process.stdout);

//     const pbar = new progressBar("installing package: ", 10, 100);

//     setInterval(() => {
//       pbar.update();
//       pbar.value++;
//     }, 100);
//   });
// });
