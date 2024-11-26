/** @format */

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Create first Middleware
// function isOldEnough(req, res, next) {
//   const age = req.query.age;
//   if (age >= 14) {
//     next();
//   } else {
//     res.status(401).json({ msg: "You are not old enough to ride this ride" });
//   }
// }

// set Globally Middleware
let requestCount = 0;

app.use(function (req, res, next) {
  requestCount++;
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});

app.get("/user", (req, res) => {
  res.status(200).json({ name: "John Week" });
});

app.post("/user", (req, res) => {
  res.status(201).json({ name: "John Week" });
});

app.get("/requestCount", (req, res) => {
  res.status(200).json({ requestCount });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
