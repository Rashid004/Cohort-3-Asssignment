/** @format */

const express = require("express");

const app = express();

let requestCount = 0;

// Create First Middleware Function to Log Requests &  Incoming HTTP Request
app.use(function (req, res, next) {
  // *** Each Incoming HTTP Request ***
  const method = req.method;
  const url = req.url;
  const timeStamp = new Date().toISOString();

  console.log(`[${timeStamp}] ${method} ${url}`);
  // *** Request Count ***
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
