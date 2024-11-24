/** @format */

const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.send(`<h1>Welcome to Home Page Requested</h1>`);
});

module.exports = router;
