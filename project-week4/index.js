/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const serverStatic = require("serve-static");

const app = express();

// use body parser to parse json
app.use(bodyParser.json());

// User Serve Static to serve static files
app.use(serverStatic("public"));
// Create A Todo
let todos = [];

// fetch all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// create a todo & Post a Todo
app.post("/todos", (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title || "",
    completed: req.body.completed || false,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// update a todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
  }
  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed || todo.completed;
  res.json(todo);
});

// delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
