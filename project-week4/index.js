/** @format */

const express = require("express");

const app = express();

// create todo list app

app.post("/api/todos", (req, res) => {
  const todo = req.body;
  res.json(todo);
});
app.listen(3000);
