const express = require("express");
const jwt = require("jsonwebtoken");
const jwt_secret = "rashidlovekiara";

const app = express();
app.use(express.json());

let users = [];

const auth = (req, res, next) => {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, jwt_secret);

  if (decodedData.username) {
    req.username = decodedData.username;
    next();
  } else res.status(401).send({ message: "No token provided" });
};

// First Sign In user
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({ username, password });

  res.json({ message: "user Created successfully" });
});

// second  signup using username or password
app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = users.find(
    (u) => u.username === username && u.password === password
  );
  if (foundUser) {
    const token = jwt.sign({ username }, jwt_secret);
    res.json({ token: token });
    console.log(token);
  } else {
    res.json({ message: "Invalid Credential" });
  }
});

// third verify jwt token
app.get("/me", auth, (req, res) => {
  const foundUser = users.find((u) => u.username === req.username);

  if (!foundUser) {
    return res.status(404).send({ message: "Invalid User" });
  }
  res.send({ username: foundUser.username, password: foundUser.password });
});

app.listen(3000);
