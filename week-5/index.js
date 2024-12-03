/** @format */

const express = require("express");

const app = express();

//

// Addition
app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({ Sum: a + b });
});

// Multiplication
app.get("/multiply", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({ Multiply: a * b });
});

// Division
app.get("/divide", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({ Quotient: a / b });
});

// Subtraction
app.get("/subtract", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  res.json({ Difference: a - b });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
