const express = require("express");
// import schema modal from db
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET, jwt } = require("./auth");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rashidansari3868038:Rashid126@cluster0.vtadf.mongodb.net/mongodb-7-2"
);
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  let errorThrown = false;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(email, hashedPassword, name);

    // Save user in MongoDb
    await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });

    throw new Error("User already exists");
  } catch (error) {
    res.json({ message: "User is already exists" });
    errorThrown = true;
  }
  if (!errorThrown) {
    res.json({
      message: "You are signed up",
    });
  }
});

// Sign In
app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({ email, password });

  if (user) {
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

  //////// {*If Middleware is not used, then the token is not extracted *}////////
  // const token = req.headers.authorization;
  // console.log("Extracted Token:", token); // Debugging token
  // if (!token) {
  //   return res
  //     .status(401)
  //     .json({ message: "Unauthorized - No token provided" });
  // }
  // let userId;
  // try {
  //   const decodedData = jwt.verify(token, JWT_SECRET);
  //   console.log("Decoded Token Data:", decodedData); // Debugging decoded token
  //   req.userId = decodedData.id;
  // } catch (error) {
  //   console.error("JWT Verification Error:", error.message);
  //   res.status(403).json({ message: "Invalid Credential" });
  // }

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
