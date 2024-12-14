/** @format */

const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const JWT_SECRET = "rashidlove123";

const users = [];

// SignUp Users
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username,
    password,
  });
  res.send({ message: "You are signup" });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  // Generate Token From JWt
  if (user) {
    const token = jwt.sign({ username: username }, JWT_SECRET);

    res.send({ Token: token });
  } else {
    res.status(403).send({ message: "Invalid Username or Password" });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.authorization;
  const userData = jwt.verify(token, JWT_SECRET);
  if (userData.username) {
    req.username = userData.username;
  }
  const user = users.find((user) => user.username === req.username);
  res.send({ username: user.username, password: user.password });
});

app.listen(3000, () => {
  console.log("Server Is Running on 3000");
});
