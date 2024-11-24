/** @format */

const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.send(`<h1>Welcome to Login Page Requested</h1>`);
});

module.exports = router;
