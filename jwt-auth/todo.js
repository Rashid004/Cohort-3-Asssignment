/** @format */

const express = require("express");

const app = express();

app.use(express.json());

const todos = [];

app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  const todo = { title, description };

  todos.push(todo);
  res.send({ todo });
});
