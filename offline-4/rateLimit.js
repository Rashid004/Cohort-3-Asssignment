/** @format */

const express = require("express");
const app = express();

let numberOfRequests = {};
setInterval(() => {
  numberOfRequests = {};
}, 1000);

app.use((req, res, next) => {
  const userId = req.headers["user-id"];

  if (numberOfRequests[userId]) {
    numberOfRequests[userId]++;
    if (numberOfRequests[userId] > 5) {
      res.status(404).send("Too many requests");
    } else {
      next();
    }
  } else {
    numberOfRequests[userId] = 1;
    next();
  }
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

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
