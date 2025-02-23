const express = require("express");
// import schema modal from db
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET, jwt } = require("./auth");
const mongoose = require("mongoose");
const app = express();

// connect uour db
mongoose.connect(
  "mongodb+srv://rashidansari3868038:Rashid126@cluster0.vtadf.mongodb.net/todo-app"
);
app.use(express.json());

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  console.log(email, password, name);

  await UserModel.create({
    email: email,
    password: password,
    name: name,
  });

  res.json({
    message: "You are signed up",
  });
});

app.use(express.static(__dirname + "/public"));

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
    password: password,
  });
  console.log(user);

  if (user) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.json({ Authorization: token });
  } else {
    res.status(403).json({ message: "Invalid Credential" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
// get post todo
app.post("/todo", auth, async (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;

  await TodoModel.create({
    title: title,
    userId: userId,
    done: done,
  });

  res.json({ message: "Todo Created" });
});
// get all todos
app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;

  try {
    const todos = await TodoModel.find({ userId: userId });
    res.json({ todos: todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
});

app.listen(3000);
