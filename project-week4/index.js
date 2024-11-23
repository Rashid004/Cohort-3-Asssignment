/** @format */

// /** @format */

// const express = require("express");

// const app = express();

// // create todo list app
// let todos = [];

// app.get("/todos", function (req, res) {
//   res.json(todos);
// });

// app.post("/todos", (req, res) => {
//   const todo = {
//     id: todos.length + 1,
//     title: req.body.title,
//     complete: req.body.complete || false,
//   };
//   todos.push(todo);
//   res.status(201).json(todo);
// });

// app.listen(3000);

const chalk = require("chalk");
console.log(chalk.red("Hello World"));
