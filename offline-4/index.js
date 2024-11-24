/** @format */
const express = require("express");
const fs = require("fs");
const app = express();

// Create A Readfile Function
app.get("/file/:fileName", (req, res) => {
  const name = req.params.fileName;
  fs.readFile(name, "utf8", (err, data) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
    } else {
      console.log(data);
      res.json({ data });
    }
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
