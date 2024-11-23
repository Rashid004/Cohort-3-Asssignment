/** @format */

const fs = require("fs");
const { Command } = require("commander");
const chalk = require("chalk");

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
    fs.readFile(file.txt, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split("\n").length;
        console.log(chalk.green(`The file ${file.txt} has ${lines} lines`));
      }
    });
  });
program.parse();
