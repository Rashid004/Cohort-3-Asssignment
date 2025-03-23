const express = require("express");
// import schema modal from db
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET, jwt } = require("./auth");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { z } = require("zod");

mongoose.connect(
  "mongodb+srv://rashidansari3868038:Rashid126@cluster0.vtadf.mongodb.net/mongodb-7-2"
);
const app = express();

app.use(express.json());

// Sign Up
app.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).regex(/[@]/).email(),
    password: z
      .string()
      .min(6)
      .max(30)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/[0-9]/)
      .regex(/[^a-zA-Z0-9]/),
    name: z.string().min(1),
  });

  const parsedBodyWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedBodyWithSuccess.success) {
    res.json({
      message: parsedBodyWithSuccess.error,
      errors: parsedBodyWithSuccess.error,
    });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const existingUser = await UserModel.findOne({ email: email });
  if (existingUser) {
    res.status(400).json({ message: "Email already in use" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(email, hashedPassword, name);

  // Save user in MongoDb
  await UserModel.create({
    email: email,
    password: hashedPassword,
    name: name,
  });

  res.json({
    message: "You are signed up",
  });
});

// Sign In
app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({ email: email });

  const passwordMatch = bcrypt.compare(password, user.password);

  if (user && passwordMatch) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.json({ token }); // Now the response clearly returns "token"
  } else {
    res.status(403).json({ message: "Invalid Credential" });
  }
});

app.post("/todo", auth, async (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const description = req.body.description;
  const done = req.body.done;

  await TodoModel.create({
    title: title,
    description: description,
    userId: userId,
    done: done,
  });

  res.json({ message: "Todo Created" });
});

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
