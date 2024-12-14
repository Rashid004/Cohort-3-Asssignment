/** @format */
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

// middleware for parsing json
app.use(express.json());

const users = [];

// function generateToken() {
//   let options = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "N",
//     "O",
//     "P",
//     "Q",
//     "R",
//     "S",
//     "T",
//     "U",
//     "V",
//     "W",
//     "X",
//     "Y",
//     "Z",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//   ];
//   let token = "";
//   for (let i = 0; i < 32; i++) {
//     token += options[Math.floor(Math.random() * options.length)];
//   }
//   return token;
// }
// Secret key for signing JWT
const JWT_SECRET = "USER_APP";

// Check auth middleware
function auth(req, res, next) {
  const token = req.headers.authorization;
  const userDetails = jwt.verify(token, JWT_SECRET);
  if (userDetails.username) {
    req.username = userDetails.username;
    next();
  } else {
    res.status(401).send({ message: "No token provided" });
  }
}

// signup route
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username,
    password,
  });
  res.send({
    message: "You have signed up",
  });
});

// signin route
app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    const token = jwt.sign({ username: username }, JWT_SECRET); // create token
    // user.token = token;
    res.send({ token: token });
  } else {
    res.status(403).send({ message: "Invalid username or password" });
  }
});

app.get("/me", auth, (req, res) => {
  const user = users.find((user) => user.username === req.username);
  res.send({ username: user.username, password: user.password });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
