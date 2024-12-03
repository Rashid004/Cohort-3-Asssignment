/** @format */

const express = require("express");

const app = express();
// Create First Middleware also create end point that expose it

let requestCount = 0;

app.use(function (req, res, next) {
  const method = req.method;
  const url = req.url;
  const timeStamp = new Date().toISOString();

  console.log(`[${timeStamp}] ${method} ${url}`);
  // Request Count Middleware
  // requestCount++;
  // console.log(`Request Count: ${requestCount}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

app.get("/user", (req, res) => {
  res.json({ name: "John Week" });
});

app.post("/user", (req, res) => {
  res.json({ name: "John Week" });
});

app.get("/requestCount", (req, res) => {
  res.json({ requestCount: 0 });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
