/** @format */

const fs = require("fs"); //  The built-in Node.js module to interact with the file system. It allows reading, writing, and manipulating files.
const { Command } = require("commander"); // import Command from commander to create cli (command line interface)
const program = new Command(); //  Initializes a new CLI instance.

// program
//   .description("An application for pizza ordring")
//   .option("-p, --peepers", "Add peepers to the pizza")
//   .option("-c, --cheese <type>", "Add the specific type of cheese", "marble")
//   .option("-C --no-cheese", "You do not want cheese");

// program.parse();

// const options = program.opts();
// console.log("You ordered a pizza with:");
// if (options.peepers) console.log(" -peepers");
// const cheese = !options.cheese ? "no cheese" : options.cheese;

// console.log("  - %s cheese", cheese);

program
  .name("counter") // name of the cli
  .description("cli to do file based task") // description of the cli
  .version("1.0.0"); // version of the cli

program
  .command("count") // name of the command to be  When the user types  (node index.js count <file>)
  .description("count the number of lines in a file") // description of the command
  .argument("<file>", "file to count") // argument of the command
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split("\n").length;
        console.log(`there are ${lines + 1} lines in the ${file}`);
      }
    });
  });

program.parse(process.argv);
