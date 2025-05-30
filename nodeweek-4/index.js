/** @format */

import fs from "fs";
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .name("counter")
  .description("Create Cli to to file based task")
  .version("1.0.0");

program
  .command("count")
  .description("Count the number of lines in a file")
  .argument("<file>", "File to count")
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split(" ").length;

        console.log(chalk.green(`The file ${file} has ${lines} lines`));
      }
    });
  });
program.parse(process.argv);
