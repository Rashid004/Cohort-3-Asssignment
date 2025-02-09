/** @format */
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");

const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
// Connectdb
mongoose.connect(
  "mongodb+srv://rashidansari3868038:Rashid126@cluster0.vtadf.mongodb.net/todo-app"
);

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  // Create Data base to stored
  await UserModel.create({
    email: email,
    password: password,
    name: name,
  });
  res.json({ message: "You are signed up" });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
    email: email,
    password: password,
  });

  if (response) {
    const token = jwt.sign({ id: response._id.toString() }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(403).json({ message: "Incorrect creds" });
  }
});

app.post("/todo", async (req, res) => {
  const { title, description } = req.body;

  await TodoModel.create({
    title: title,
    description: description,
    userId: ObjectId,
  });
  res.json({ message: "Todo Added" });
});

app.get("/todos", auth, (req, res) => {
  res.json({});
});

app.listen(3000, () => {
  console.log("Server Start");
});
